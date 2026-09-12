import "server-only";

import type { SocialFeedResponse, SocialItem, SocialPlatform, SocialPlatformFeed } from "@/types/social";

const REVALIDATE_SECONDS = 600;
const REQUEST_TIMEOUT_MS = 7000;
const META_VERSION = process.env.META_GRAPH_VERSION || "v26.0";
const INSTAGRAM_VERSION = process.env.INSTAGRAM_GRAPH_VERSION || META_VERSION;

const PROFILE_URLS = {
  Facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ||
    "https://www.facebook.com/ShiwendraKumarShuklaRBL",
  Instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://www.instagram.com/shiwendra4rbl/",
  YouTube:
    process.env.NEXT_PUBLIC_YOUTUBE_URL ||
    "https://www.youtube.com/@shiwendra",
  X: process.env.NEXT_PUBLIC_X_URL || "https://x.com/Shiwendra4Rbl",
} satisfies Record<SocialPlatform, string>;

function cleanText(value: unknown, max = 1200): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (!cleaned) return undefined;
  return cleaned.slice(0, max);
}

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

async function fetchJson<T>(url: URL, headers?: HeadersInit): Promise<T> {
  const response = await fetch(url, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 400);
    throw new Error(`Upstream ${response.status}: ${detail}`);
  }

  return (await response.json()) as T;
}

function notConfigured(platform: SocialPlatform, note: string): SocialPlatformFeed {
  return {
    platform,
    profileUrl: PROFILE_URLS[platform],
    status: "not_configured",
    items: [],
    note,
  };
}

function failed(platform: SocialPlatform): SocialPlatformFeed {
  return {
    platform,
    profileUrl: PROFILE_URLS[platform],
    status: "error",
    items: [],
    note: "The official feed could not be loaded right now.",
  };
}

async function getFacebookFeed(): Promise<SocialPlatformFeed> {
  const pageId = process.env.META_PAGE_ID;
  const token = process.env.META_PAGE_ACCESS_TOKEN;

  if (!pageId || !token) {
    return notConfigured(
      "Facebook",
      "Add META_PAGE_ID and META_PAGE_ACCESS_TOKEN to enable the live Facebook feed.",
    );
  }

  try {
    const url = new URL(`https://graph.facebook.com/${META_VERSION}/${pageId}/posts`);
    url.searchParams.set(
      "fields",
      "id,message,created_time,permalink_url,full_picture",
    );
    url.searchParams.set("limit", "12");
    url.searchParams.set("access_token", token);

    const json = await fetchJson<{
      data?: Array<{
        id?: string;
        message?: string;
        created_time?: string;
        permalink_url?: string;
        full_picture?: string;
      }>;
    }>(url);

    const items: SocialItem[] = (json.data || [])
      .map((item) => {
        const postUrl = isHttpsUrl(item.permalink_url)
          ? item.permalink_url
          : PROFILE_URLS.Facebook;
        const image = isHttpsUrl(item.full_picture) ? item.full_picture : undefined;
        return {
          id: item.id || postUrl,
          platform: "Facebook" as const,
          url: postUrl,
          text: cleanText(item.message),
          image,
          publishedAt: item.created_time,
          mediaType: image ? ("image" as const) : ("text" as const),
        };
      })
      .filter((item) => item.text || item.image);

    return {
      platform: "Facebook",
      profileUrl: PROFILE_URLS.Facebook,
      status: "connected",
      items,
    };
  } catch (error) {
    console.error("[social/facebook]", error);
    return failed("Facebook");
  }
}

async function resolveInstagramFromFacebook(): Promise<{
  userId: string;
  token: string;
  host: "facebook";
} | null> {
  const pageId = process.env.META_PAGE_ID;
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) return null;

  const explicitId = process.env.INSTAGRAM_USER_ID;
  if (explicitId) return { userId: explicitId, token, host: "facebook" };

  const url = new URL(`https://graph.facebook.com/${META_VERSION}/${pageId}`);
  url.searchParams.set("fields", "instagram_business_account");
  url.searchParams.set("access_token", token);

  const json = await fetchJson<{
    instagram_business_account?: { id?: string };
  }>(url);
  const userId = json.instagram_business_account?.id;
  return userId ? { userId, token, host: "facebook" } : null;
}

async function getInstagramFeed(): Promise<SocialPlatformFeed> {
  try {
    const directToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const directUserId = process.env.INSTAGRAM_USER_ID;

    let connection:
      | { userId: string; token: string; host: "instagram" | "facebook" }
      | null = null;

    if (directToken && directUserId) {
      connection = {
        userId: directUserId,
        token: directToken,
        host: "instagram",
      };
    } else {
      connection = await resolveInstagramFromFacebook();
    }

    if (!connection) {
      return notConfigured(
        "Instagram",
        "Link the Instagram Professional account to the Facebook Page, or add INSTAGRAM_USER_ID and INSTAGRAM_ACCESS_TOKEN.",
      );
    }

    const base =
      connection.host === "instagram"
        ? `https://graph.instagram.com/${INSTAGRAM_VERSION}`
        : `https://graph.facebook.com/${META_VERSION}`;

    const url = new URL(`${base}/${connection.userId}/media`);
    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    );
    url.searchParams.set("limit", "12");
    url.searchParams.set("access_token", connection.token);

    const json = await fetchJson<{
      data?: Array<{
        id?: string;
        caption?: string;
        media_type?: string;
        media_url?: string;
        thumbnail_url?: string;
        permalink?: string;
        timestamp?: string;
      }>;
    }>(url);

    const items: SocialItem[] = (json.data || [])
      .map((item) => {
        const type = item.media_type?.toUpperCase();
        const isVideo = type === "VIDEO" || type === "REELS";
        const imageCandidate = item.thumbnail_url || item.media_url;
        return {
          id: item.id || item.permalink || crypto.randomUUID(),
          platform: "Instagram" as const,
          url: isHttpsUrl(item.permalink) ? item.permalink : PROFILE_URLS.Instagram,
          text: cleanText(item.caption),
          image: isHttpsUrl(imageCandidate) ? imageCandidate : undefined,
          publishedAt: item.timestamp,
          mediaType: isVideo ? ("video" as const) : ("image" as const),
        };
      })
      .filter((item) => item.text || item.image);

    return {
      platform: "Instagram",
      profileUrl: PROFILE_URLS.Instagram,
      status: "connected",
      items,
    };
  } catch (error) {
    console.error("[social/instagram]", error);
    return failed("Instagram");
  }
}

async function getYouTubeFeed(): Promise<SocialPlatformFeed> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle = (process.env.YOUTUBE_HANDLE || "@shiwendra").trim();

  if (!apiKey) {
    return notConfigured(
      "YouTube",
      "Add YOUTUBE_API_KEY. The channel can be resolved automatically from YOUTUBE_HANDLE.",
    );
  }

  try {
    const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
    channelUrl.searchParams.set("part", "contentDetails,snippet");
    channelUrl.searchParams.set("forHandle", handle);
    channelUrl.searchParams.set("key", apiKey);

    const channelJson = await fetchJson<{
      items?: Array<{
        id?: string;
        snippet?: { title?: string };
        contentDetails?: { relatedPlaylists?: { uploads?: string } };
      }>;
    }>(channelUrl);

    const uploads = channelJson.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploads) throw new Error("YouTube uploads playlist was not found for handle.");

    const playlistUrl = new URL(
      "https://www.googleapis.com/youtube/v3/playlistItems",
    );
    playlistUrl.searchParams.set("part", "snippet,contentDetails");
    playlistUrl.searchParams.set("playlistId", uploads);
    playlistUrl.searchParams.set("maxResults", "12");
    playlistUrl.searchParams.set("key", apiKey);

    const json = await fetchJson<{
      items?: Array<{
        id?: string;
        contentDetails?: { videoId?: string; videoPublishedAt?: string };
        snippet?: {
          title?: string;
          description?: string;
          publishedAt?: string;
          resourceId?: { videoId?: string };
          thumbnails?: Record<string, { url?: string }>;
        };
      }>;
    }>(playlistUrl);

    const items: SocialItem[] = (json.items || [])
      .map((item) => {
        const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
        if (!videoId) return null;
        const thumbs = item.snippet?.thumbnails || {};
        const image =
          thumbs.maxres?.url ||
          thumbs.standard?.url ||
          thumbs.high?.url ||
          thumbs.medium?.url ||
          thumbs.default?.url;
        return {
          id: item.id || videoId,
          platform: "YouTube" as const,
          url: `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`,
          title: cleanText(item.snippet?.title, 220),
          text: cleanText(item.snippet?.description, 700),
          image: isHttpsUrl(image) ? image : undefined,
          publishedAt:
            item.contentDetails?.videoPublishedAt || item.snippet?.publishedAt,
          mediaType: "video" as const,
        };
      })
      .filter((item): item is SocialItem => Boolean(item));

    return {
      platform: "YouTube",
      profileUrl: PROFILE_URLS.YouTube,
      status: "connected",
      items,
    };
  } catch (error) {
    console.error("[social/youtube]", error);
    return failed("YouTube");
  }
}

async function getXFeed(): Promise<SocialPlatformFeed> {
  const bearer = process.env.X_BEARER_TOKEN;
  const username = (process.env.X_USERNAME || "Shiwendra4Rbl").replace(/^@/, "");

  if (!bearer) {
    return notConfigured(
      "X",
      "Add X_BEARER_TOKEN. X_USER_ID is optional because the code resolves it from X_USERNAME.",
    );
  }

  try {
    let userId = process.env.X_USER_ID;
    if (!userId) {
      const userUrl = new URL(
        `https://api.x.com/2/users/by/username/${encodeURIComponent(username)}`,
      );
      const userJson = await fetchJson<{ data?: { id?: string } }>(userUrl, {
        Authorization: `Bearer ${bearer}`,
      });
      userId = userJson.data?.id;
    }

    if (!userId) throw new Error("X user ID could not be resolved.");

    const url = new URL(`https://api.x.com/2/users/${userId}/tweets`);
    url.searchParams.set("max_results", "10");
    url.searchParams.set("exclude", "replies,retweets");
    url.searchParams.set("tweet.fields", "created_at,attachments");
    url.searchParams.set("expansions", "attachments.media_keys");
    url.searchParams.set(
      "media.fields",
      "media_key,type,url,preview_image_url,width,height",
    );

    const json = await fetchJson<{
      data?: Array<{
        id: string;
        text?: string;
        created_at?: string;
        attachments?: { media_keys?: string[] };
      }>;
      includes?: {
        media?: Array<{
          media_key?: string;
          type?: string;
          url?: string;
          preview_image_url?: string;
        }>;
      };
    }>(url, { Authorization: `Bearer ${bearer}` });

    const mediaByKey = new Map(
      (json.includes?.media || [])
        .filter((media) => media.media_key)
        .map((media) => [media.media_key as string, media]),
    );

    const items: SocialItem[] = (json.data || []).map((item) => {
      const mediaKey = item.attachments?.media_keys?.[0];
      const media = mediaKey ? mediaByKey.get(mediaKey) : undefined;
      const imageCandidate = media?.url || media?.preview_image_url;
      return {
        id: item.id,
        platform: "X" as const,
        url: `https://x.com/${encodeURIComponent(username)}/status/${item.id}`,
        text: cleanText(item.text),
        image: isHttpsUrl(imageCandidate) ? imageCandidate : undefined,
        publishedAt: item.created_at,
        mediaType:
          media?.type === "video" || media?.type === "animated_gif"
            ? ("video" as const)
            : imageCandidate
              ? ("image" as const)
              : ("text" as const),
      };
    });

    return {
      platform: "X",
      profileUrl: PROFILE_URLS.X,
      status: "connected",
      items,
    };
  } catch (error) {
    console.error("[social/x]", error);
    return failed("X");
  }
}

export async function getLiveSocialFeed(): Promise<SocialFeedResponse> {
  const feeds = await Promise.all([
    getFacebookFeed(),
    getYouTubeFeed(),
    getInstagramFeed(),
    getXFeed(),
  ]);

  return {
    updatedAt: new Date().toISOString(),
    feeds,
  };
}
