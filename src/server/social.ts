import "server-only";
import { z } from "zod";
import { curatedPosts, type SocialPost } from "@/content/media";
const localText = z.object({
  hi: z.string().max(400),
  en: z.string().max(400),
});
const safeUrl = z.url().refine((v) => {
  const u = new URL(v);
  return (
    u.protocol === "https:" &&
    [
      "facebook.com",
      "www.facebook.com",
      "x.com",
      "www.instagram.com",
      "instagram.com",
      "youtube.com",
      "www.youtube.com",
      "youtu.be",
    ].includes(u.hostname)
  );
});
const post = z.object({
  id: z.string().max(100),
  platform: z.enum(["Facebook", "X", "Instagram", "YouTube"]),
  url: safeUrl,
  title: localText,
  excerpt: localText,
  image: z
    .string()
    .regex(/^\/images\/[a-zA-Z0-9/_\-.]+$/)
    .optional(),
  publishedAt: z.iso.datetime().optional(),
  kind: z.enum(["post", "video"]),
});
// The configured server-side adapter must use authorized official APIs and emit this schema.
// No browser tokens, native embeds, scraping, or untrusted remote image hosts.
export async function getSocialPosts(): Promise<SocialPost[]> {
  const endpoint = process.env.SOCIAL_FEED_URL;
  if (!endpoint) return curatedPosts;
  try {
    const u = new URL(endpoint);
    if (u.protocol !== "https:") return curatedPosts;
    const response = await fetch(u, {
      headers: process.env.SOCIAL_FEED_TOKEN
        ? { Authorization: `Bearer ${process.env.SOCIAL_FEED_TOKEN}` }
        : {},
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) return curatedPosts;
    const bytes = await response.text();
    if (bytes.length > 100000) return curatedPosts;
    const result = z.array(post).max(30).parse(JSON.parse(bytes));
    return result.length ? result : curatedPosts;
  } catch {
    return curatedPosts;
  }
}
