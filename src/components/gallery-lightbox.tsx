"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Locale, pick } from "@/content/site";
import { type GalleryItem } from "@/content/media";

export default function GalleryLightbox({
  locale,
  items,
  index,
  move,
  onClose,
}: {
  locale: Locale;
  items: GalleryItem[];
  index: number;
  move: (delta: number) => void;
  onClose: () => void;
}) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.dataset.overlayOpen;
    document.body.dataset.overlayOpen = "true";
    requestAnimationFrame(() => closeButton.current?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (previous) document.body.dataset.overlayOpen = previous;
      else delete document.body.dataset.overlayOpen;
    };
  }, [move, onClose]);

  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={pick(locale, "तस्वीरों की गैलरी", "Photo gallery")}
      className="fixed inset-0 z-[90] bg-[#031329]/97 p-3 text-white backdrop-blur-md sm:p-7"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col">
        <div className="flex items-center justify-between border-b border-white/15 pb-3">
          <span className="ui-label text-xs font-semibold tracking-[.12em] text-white/70">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <button
            ref={closeButton}
            aria-label={pick(locale, "गैलरी बंद करें", "Close gallery")}
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <X />
          </button>
        </div>

        <div
          className="relative my-3 min-h-0 flex-1 overflow-hidden sm:my-5"
          onTouchStart={(e) => {
            start.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          }}
          onTouchEnd={(e) => {
            if (!start.current) return;
            const dx = e.changedTouches[0].clientX - start.current.x;
            const dy = e.changedTouches[0].clientY - start.current.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2)
              move(dx < 0 ? 1 : -1);
            start.current = null;
          }}
        >
          {item.kind === "video" ? (
            <div className="h-full overflow-y-auto">
              <video
                key={item.src}
                controls
                playsInline
                preload="metadata"
                poster={item.poster}
                className="h-full w-full object-contain"
              >
                <source src={item.src} />
                {item.captions && (
                  <track
                    kind="captions"
                    src={item.captions[locale]}
                    srcLang={locale}
                    label={locale === "hi" ? "हिंदी" : "English"}
                    default
                  />
                )}
              </video>
              {item.transcript && (
                <p className="p-4">{item.transcript[locale]}</p>
              )}
            </div>
          ) : (
            <Image
              key={item.src}
              src={item.src}
              alt={item.id}
              fill
              priority
              sizes="96vw"
              className="object-contain"
            />
          )}
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-white/15 pt-3">
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"
            aria-label={pick(locale, "पिछली तस्वीर", "Previous photo")}
            onClick={() => move(-1)}
          >
            <ArrowLeft />
          </button>
          {/* <p aria-live="polite" className="text-center text-sm leading-relaxed text-white/80">
            {item.alt[locale]}
          </p> */}
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"
            aria-label={pick(locale, "अगली तस्वीर", "Next photo")}
            onClick={() => move(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
