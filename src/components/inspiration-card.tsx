"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Locale, pick, say } from "@/content/site";

type Bilingual = readonly [string, string];

type InspirationItem = {
  id: string;
  name: Bilingual;
  ideas: Bilingual;
  body: Bilingual;
  image: string;
  fit: "cover" | "contain";
};

export function InspirationCard({
  item,
  index,
  locale,
  lead = false,
  side = false,
}: {
  item: InspirationItem;
  index: number;
  locale: Locale;
  lead?: boolean;
  side?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  const minHeight = lead
    ? "min-h-[470px] lg:min-h-[650px]"
    : side
      ? "min-h-[390px] lg:min-h-[316px]"
      : "min-h-[390px]";

  return (
    <article
      className={`
        group/card
        relative
        isolate
        h-full
        ${minHeight}
        [perspective:1400px]
      `}
    >
      <div
        className={`
          relative
          h-full
          w-full

          transition-transform
          duration-[700ms]
          ease-[cubic-bezier(.2,.75,.2,1)]

          [transform-style:preserve-3d]

          lg:group-hover/card:[transform:rotateY(180deg)]
          lg:group-focus-within/card:[transform:rotateY(180deg)]

          ${flipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* =================================================
            FRONT — PHOTO
        ================================================== */}

        <button
          type="button"
          onClick={() => setFlipped(true)}
          aria-label={pick(
            locale,
            `${say(locale, item.name)} के बारे में पढ़ें`,
            `Read about ${say(locale, item.name)}`,
          )}
          className="
            absolute
            inset-0

            block
            h-full
            w-full

            overflow-hidden

            border
            border-white/15

            bg-[#071b35]

            text-left

            [backface-visibility:hidden]
            [-webkit-backface-visibility:hidden]
          "
        >
          <Image
            src={item.image}
            alt={say(locale, item.name)}
            fill
            unoptimized={item.image.startsWith("http")}
            sizes={
              lead
                ? "(max-width:1023px) 100vw, 58vw"
                : "(max-width:1023px) 100vw, 34vw"
            }
            className={`
              ${
                item.fit === "contain"
                  ? "object-contain bg-[#d9d9d2] p-5"
                  : "object-cover"
              }

              transition-transform
              duration-700

              motion-safe:group-hover/card:scale-[1.035]
            `}
          />

          {/* readability only at bottom */}
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-t
              from-[#031326]/95
              via-[#031326]/18
              via-45%
              to-transparent
            "
          />

          {/* number */}
          <span
            className="
              ui-label
              absolute
              left-5
              top-5
              z-10

              border
              border-white/25

              bg-[#071b35]/72

              px-3
              py-2

              text-[10px]
              font-bold
              tracking-[.13em]
              text-gold

              backdrop-blur-sm
            "
          >
            0{index + 1}
          </span>

          {/* desktop hint */}
          <span
            className="
              ui-label

              absolute
              right-5
              top-5
              z-10

              hidden

              items-center
              gap-2

              border
              border-white/20

              bg-[#071b35]/65

              px-3
              py-2

              text-[9px]
              font-bold
              uppercase
              tracking-[.12em]
              text-white/70

              backdrop-blur-sm

              lg:inline-flex
            "
          >
            {pick(locale, "देखने के लिए होवर करें", "Hover to explore")}

            <ArrowUpRight size={12} />
          </span>

          {/* mobile hint */}
          <span
            className="
              ui-label

              absolute
              right-5
              top-5
              z-10

              inline-flex
              items-center
              gap-2

              border
              border-white/20

              bg-[#071b35]/70

              px-3
              py-2

              text-[9px]
              font-bold
              uppercase
              tracking-[.1em]
              text-white/75

              backdrop-blur-sm

              lg:hidden
            "
          >
            {pick(locale, "जानने के लिए टैप करें", "Tap to explore")}
          </span>

          {/* minimal front text */}
          <div
            className={`
              absolute
              inset-x-0
              bottom-0
              z-10

              ${lead ? "p-6 sm:p-8 lg:p-9" : "p-5 sm:p-6"}
            `}
          >
            <p
              className="
                ui-label

                text-[10px]
                font-bold
                uppercase
                tracking-[.11em]
                text-gold

                sm:text-[11px]
              "
            >
              {say(locale, item.ideas)}
            </p>

            <h3
              className={`
                mt-2

                font-display
                leading-tight
                text-white

                ${lead ? "text-4xl sm:text-5xl" : "text-3xl"}
              `}
            >
              {say(locale, item.name)}
            </h3>
          </div>

          <span
            className="
              absolute
              bottom-0
              left-0
              z-20

              h-[3px]
              w-16

              bg-gold

              transition-all
              duration-700

              group-hover/card:w-full
            "
          />
        </button>

        {/* =================================================
            BACK — DETAILS
        ================================================== */}

        <button
          type="button"
          onClick={() => setFlipped(false)}
          aria-label={pick(
            locale,
            "चित्र पर वापस जाएँ",
            "Return to photograph",
          )}
          className="
            absolute
            inset-0

            flex
            h-full
            w-full
            flex-col

            overflow-hidden

            border
            border-gold/35

            bg-[#0a2443]

            p-6
            text-left
            text-white

            [backface-visibility:hidden]
            [-webkit-backface-visibility:hidden]
            [transform:rotateY(180deg)]

            sm:p-7
            lg:p-8
          "
        >
          {/* background texture */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0

              bg-[radial-gradient(circle_at_85%_15%,rgba(198,154,69,.16),transparent_30%),radial-gradient(circle_at_10%_95%,rgba(20,92,165,.25),transparent_32%)]
            "
          />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <span
                className="
                  ui-label

                  border
                  border-gold/30

                  px-3
                  py-2

                  text-[10px]
                  font-bold
                  tracking-[.13em]
                  text-gold
                "
              >
                0{index + 1}
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  gap-2

                  text-[10px]
                  font-semibold
                  text-white/55

                  lg:hidden
                "
              >
                <ArrowLeft size={13} />

                {pick(locale, "फोटो पर वापस", "Back to photo")}
              </span>
            </div>

            <div
              className={`
                my-auto

                ${lead ? "max-w-2xl" : "max-w-xl"}
              `}
            >
              <p
                className="
                  ui-label

                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[.13em]
                  text-gold
                "
              >
                {say(locale, item.ideas)}
              </p>

              <h3
                className={`
                  mt-4

                  font-display
                  leading-tight
                  text-white

                  ${lead ? "text-4xl sm:text-5xl" : "text-3xl"}
                `}
              >
                {say(locale, item.name)}
              </h3>

              <div
                className="
                  my-5
                  flex
                  items-center
                  gap-3
                "
              >
                <span className="h-[3px] w-12 bg-gold" />
                <span className="h-px flex-1 bg-white/15" />
              </div>

              <p
                className={`
                  text-balanced-justify

                  leading-[1.85]
                  text-white/78

                  ${lead ? "text-base sm:text-lg" : "text-sm sm:text-[15px]"}
                `}
              >
                {say(locale, item.body)}
              </p>
            </div>

            <p
              className="
                ui-label

                mt-auto
                border-t
                border-white/10
                pt-4

                text-[9px]
                font-semibold
                uppercase
                tracking-[.12em]
                text-white/35
              "
            >
              {pick(
                locale,
                "विचार और सार्वजनिक प्रेरणा",
                "Ideas & public inspiration",
              )}
            </p>
          </div>
        </button>
      </div>
    </article>
  );
}
