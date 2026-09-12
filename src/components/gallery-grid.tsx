"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { Locale, pick } from "@/content/site";
import { galleryItems } from "@/content/media";
import Lightbox from "./gallery-lightbox";
export function GalleryGrid({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState<number | null>(null);
  const buttons = useRef<(HTMLAnchorElement | null)[]>([]);
  const opener = useRef(0);
  const move = useCallback((delta: number) => {
    setIndex((v) =>
      v === null
        ? null
        : (v + delta + galleryItems.length) % galleryItems.length,
    );
  }, []);
  const close = useCallback(() => {
    setIndex(null);
    requestAnimationFrame(() => buttons.current[opener.current]?.focus());
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
        {galleryItems.map((p, i) => (
          <a
            href={p.kind === "video" ? p.src : p.src}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            key={p.id}
            onClick={(event) => {
              // Progressive enhancement: without hydration this remains a normal image/video link.
              event.preventDefault();
              opener.current = i;
              setIndex(i);
            }}
            aria-label={`${pick(locale, "खोलें", "Open")}`}
            className={`group relative overflow-hidden bg-[#dce1e3] text-left ${i === 0 ? "col-span-2 h-[430px] lg:col-span-1 lg:row-span-2 lg:h-full" : i === 4 ? "col-span-2 h-[340px] lg:col-span-1" : "h-[230px] sm:h-[320px]"}`}
          >
            <Image
              src={p.kind === "video" ? p.poster! : p.src}
              alt={p.id}
              fill
              sizes="(max-width: 767px) 100vw, 35vw"
              priority={i === 0}
              className={`${p.id === "portrait" ? "object-contain object-bottom" : "object-cover"} transition-transform duration-700 motion-safe:group-hover:scale-[1.035]`}
            />
            {/* <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-14 text-sm leading-relaxed text-white">
              {p.alt[locale]}
            </span> */}
            <span className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-navy/80 text-white">
              {p.kind === "video" ? (
                <Play size={18} />
              ) : (
                <ArrowUpRight size={18} />
              )}
            </span>
          </a>
        ))}
      </div>
      {index !== null && (
        <Lightbox
          locale={locale}
          items={galleryItems}
          index={index}
          move={move}
          onClose={close}
        />
      )}
    </>
  );
}
