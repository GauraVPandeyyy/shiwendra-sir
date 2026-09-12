export type SocialPlatform = "Facebook" | "Instagram" | "YouTube" | "X";
export type FeedStatus = "connected" | "not_configured" | "error";

export interface SocialItem {
  id: string;
  platform: SocialPlatform;
  url: string;
  title?: string;
  text?: string;
  image?: string;
  publishedAt?: string;
  mediaType: "text" | "image" | "video";
}

export interface SocialPlatformFeed {
  platform: SocialPlatform;
  profileUrl: string;
  status: FeedStatus;
  items: SocialItem[];
  note?: string;
}

export interface SocialFeedResponse {
  updatedAt: string;
  feeds: SocialPlatformFeed[];
}
