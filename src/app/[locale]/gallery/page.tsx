import { permanentRedirect } from "next/navigation";

import { Locale } from "@/content/site";

export default async function GalleryRedirect({
  params,
}: {
  params: Promise<{
    locale: Locale;
  }>;
}) {
  const { locale } = await params;

  permanentRedirect(`/${locale}/media#gallery`);
}
