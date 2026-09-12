import { Locale, pick } from "@/content/site";
import { GalleryGrid } from "@/components/gallery-grid";
import { wrap } from "@/components/ui";
export function GalleryPage({ locale }: { locale: Locale }) {
  return (
    <section
      id="gallery"
      className={`${wrap} -scroll-mt-16 pb-20 pt-14 lg:pt-20`}
    >
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-navy/20 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">
            {pick(locale, "तस्वीरों का संग्रह", "A COLLECTION OF PHOTOGRAPHS")}
          </p>
          <h1 className="font-display text-6xl leading-snug text-navy sm:text-8xl">
            {pick(locale, "गैलरी", "Gallery")}
          </h1>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-ink/70">
          {pick(
            locale,
            "व्यक्तिगत परिचय और सार्वजनिक सहभागिता की तस्वीरें। किसी तस्वीर को पूरा देखने के लिए चुनें।",
            "Portraits and photographs of public participation. Select an image to explore the full view.",
          )}
        </p>
      </div>
      <GalleryGrid locale={locale} />
    </section>
  );
}
