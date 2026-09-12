import { Locale } from "@/content/site";
import { pageMetadata, StructuredData } from "@/lib/seo";
import { JansevaPage } from "@/components/pages/janseva";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return pageMetadata((await params).locale, "/janseva");
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: StructuredData({ locale, path: "/janseva" }),
        }}
      />
      <JansevaPage locale={locale} />
    </>
  );
}
