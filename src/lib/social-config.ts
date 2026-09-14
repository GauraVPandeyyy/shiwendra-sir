function splitUrls(value?: string) {
  return (value ?? "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
}

export const socialConfig = {
  facebook: {
    profileUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ?? "",
    posts: splitUrls(process.env.NEXT_PUBLIC_FACEBOOK_POSTS),
  },

  instagram: {
    profileUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
    posts: splitUrls(process.env.NEXT_PUBLIC_INSTAGRAM_POSTS),
  },

  x: {
    profileUrl: process.env.NEXT_PUBLIC_X_URL?.trim() ?? "",
    posts: splitUrls(process.env.NEXT_PUBLIC_X_POSTS),
  },

  youtube: {
    profileUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() ?? "",
    videos: splitUrls(process.env.NEXT_PUBLIC_YOUTUBE_VIDEOS),
  },
} as const;
