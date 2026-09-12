import { Locale } from "@/content/site";
import { pageMetadata, StructuredData } from "@/lib/seo";
import { HarchandpurPage } from "@/components/pages/harchandpur";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return pageMetadata((await params).locale, "/harchandpur");
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
          __html: StructuredData({ locale, path: "/harchandpur" }),
        }}
      />
      <HarchandpurPage locale={locale} />
    </>
  );
}
