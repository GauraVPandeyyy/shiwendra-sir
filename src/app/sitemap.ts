import type { MetadataRoute } from "next";
import { origin, paths } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["hi", "en"].flatMap((locale) =>
    paths.map((path) => ({
      url: `${origin}/${locale}${path}`,
      alternates: {
        languages: {
          "hi-IN": `${origin}/hi${path}`,
          "en-IN": `${origin}/en${path}`,
          "x-default": `${origin}/hi${path}`,
        },
      },
    })),
  );
}
