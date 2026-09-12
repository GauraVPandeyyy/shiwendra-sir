import { Locale, Bilingual, say, pick } from "@/content/site";
import Image from "next/image";

function splitOpening(locale: Locale, text: string) {
  const marker = locale === "hi" ? "।" : ".";
  const index = text.indexOf(marker);
  if (index === -1 || index > 145) return ["", text] as const;
  return [text.slice(0, index + 1), text.slice(index + 1).trim()] as const;
}

export function Paragraphs({
  locale,
  items,
  className = "",
}: {
  locale: Locale;
  items: Bilingual[];
  className?: string;
}) {
  return (
    <div className={`editorial-prose ${className}`}>
      {items.map((p, i) => {
        const text = say(locale, p);
        const [opening, rest] = splitOpening(locale, text);
        return (
          <p key={i}>
            {opening ? (
              <>
                <span className="editorial-opening">{opening}</span> {rest}
              </>
            ) : (
              text
            )}
          </p>
        );
      })}
    </div>
  );
}

export function EditorialQuote({
  locale,
  hi,
  en,
  dark = false,
}: {
  locale: Locale;
  hi: string;
  en: string;
  dark?: boolean;
}) {
  return (
    <blockquote
      className={`relative overflow-hidden border-y py-7 pl-6 pr-3 sm:pl-8 ${
        dark ? "border-white/20 text-white" : "border-navy/20 text-navy"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute -left-1 -top-8 font-display text-[8rem] leading-none text-gold/25"
      >
        “
      </span>
      <p className="relative max-w-3xl font-display text-2xl leading-[1.5] sm:text-3xl">
        {pick(locale, hi, en)}
      </p>
    </blockquote>
  );
}

export function ThemeImage({
  theme,
  locale,
  className = "aspect-[4/3]",
}: {
  theme: string;
  locale: Locale;
  className?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-navy ${className}`}>
      <Image
        src={`/images/social-service/${theme}.png`}
        alt={pick(
          locale,
          "सेवा के विषय का प्रतीकात्मक चित्र",
          "Representative illustration of a service theme",
        )}
        fill
        sizes="(max-width: 767px) 100vw, 60vw"
        className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
      {/* <figcaption className="ui-label absolute bottom-3 left-3 border border-white/20 bg-navy/85 px-2.5 py-1.5 text-[11px] text-white backdrop-blur-sm">
        {pick(locale, "प्रतीकात्मक चित्र", "Representative image")}
      </figcaption> */}
    </figure>
  );
}
