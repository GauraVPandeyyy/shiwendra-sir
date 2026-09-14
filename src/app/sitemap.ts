import type { MetadataRoute } from "next";

import { origin, paths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "hi"].flatMap((locale) =>
    paths.map((path) => ({
      url: `${origin}/${locale}${path}`,

      alternates: {
        languages: {
          "en-IN": `${origin}/en${path}`,
          "hi-IN": `${origin}/hi${path}`,
          "x-default": `${origin}/en${path}`,
        },
      },
    })),
  );
}
