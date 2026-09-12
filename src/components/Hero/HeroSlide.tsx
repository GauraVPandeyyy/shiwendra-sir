"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { HeroSlideData } from "./heroData";
import { type Locale, say } from "@/content/site";

const BSP_SYMBOL =
  "https://upload.wikimedia.org/wikipedia/commons/9/98/Indian_Election_Symbol_Elephant.png";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.085, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSlide({
  slide,
  isActive,
  locale,
}: {
  slide: HeroSlideData;
  isActive: boolean;
  locale: Locale;
}) {
  const href = (path: string) => `/${locale}${path}`;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f7f4ec]">
      <img
        src={slide.desktopImage}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{ objectPosition: slide.desktopPosition ?? "center center" }}
        className="pointer-events-none absolute inset-0 hidden h-full w-full select-none object-cover md:block"
      />
      <img
        src={slide.mobileImage}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{ objectPosition: slide.mobilePosition ?? "center bottom" }}
        className="pointer-events-none absolute inset-0 block h-full w-full select-none object-cover md:hidden"
      />

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-[62%] bg-gradient-to-r from-[#faf8f3] via-[#faf8f3]/92 via-72% to-transparent md:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[63%] bg-gradient-to-b from-[#faf8f3]/96 via-[#faf8f3]/86 to-transparent md:hidden" />

      <img
        src={BSP_SYMBOL}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[3%] top-[18%] z-[3] hidden w-[150px] opacity-[.055] grayscale lg:block xl:w-[190px]"
      />

      <div className="absolute inset-0 z-10 hidden md:block">
        <div className="mx-auto flex h-full max-w-[1440px] items-center px-8 pt-[7px] lg:px-16">
          {isActive && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="w-[62%] max-w-[790px] pr-8"
            >
              <motion.div
                variants={itemVariants}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-[2px] w-11 shrink-0 bg-gold" />
                <span className="ui-label text-xs font-bold uppercase tracking-[0.16em] text-blue lg:text-sm">
                  {say(locale, slide.eyebrow)}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className={`${locale === "hi" ? "signature-title leading-[1.27]" : "font-display leading-[1.04]"} max-w-[820px] w-full text-[clamp(3.15rem,5.1vw,5.55rem)] font-semibold  tracking-[-0.025em] text-navy`}
              >
                {say(locale, slide.title)}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-[640px] text-base leading-[1.82] text-ink/75 lg:text-[1.08rem]"
              >
                {say(locale, slide.subtitle)}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={href(slide.primaryLink)}
                  className="group ui-label inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(6,47,99,.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue"
                >
                  {say(locale, slide.primaryButton)}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {slide.secondaryButton && slide.secondaryLink && (
                  <Link
                    href={href(slide.secondaryLink)}
                    className="ui-label inline-flex min-h-12 items-center justify-center rounded-full border border-navy/18 bg-white/75 px-6 py-3 text-sm font-bold text-navy shadow-sm backdrop-blur-md transition duration-300 hover:border-gold hover:bg-white"
                  >
                    {say(locale, slide.secondaryButton)}
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 z-10 h-[60%] md:hidden">
        <div className="mx-auto h-full w-full max-w-lg px-5 pt-[20px] min-[390px]:pt-[18px]">
          {isActive && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={itemVariants}
                className="mb-3 flex items-center gap-2"
              >
                <span className="h-[2px] w-7 shrink-0 bg-gold" />
                <span className="ui-label text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-blue min-[390px]:text-[11px]">
                  {say(locale, slide.eyebrow)}
                </span>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className={`${locale === "hi" ? "signature-title" : "font-display"} max-w-[98%] text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] text-navy min-[390px]:text-[2.4rem]`}
              >
                {say(locale, slide.title)}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-3 max-w-[96%] text-[13px] leading-[1.6] text-ink/74 min-[390px]:text-[14px]"
              >
                {say(locale, slide.subtitle)}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.42 }}
          className="absolute inset-x-0 bottom-[74px] z-30 mx-auto flex w-full max-w-[430px] items-center justify-center gap-2 px-5 md:hidden"
        >
          <Link
            href={href(slide.primaryLink)}
            className="ui-label group flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-white/94 px-3 py-2.5 text-center text-[11px] font-bold leading-tight text-navy shadow-[0_10px_30px_rgba(0,0,0,.18)] backdrop-blur-xl transition active:scale-[.98]"
          >
            {say(locale, slide.primaryButton)}
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
          {slide.secondaryButton && slide.secondaryLink && (
            <Link
              href={href(slide.secondaryLink)}
              className="ui-label flex min-h-11 flex-1 items-center justify-center rounded-full border border-white/45 bg-navy/76 px-3 py-2.5 text-center text-[11px] font-bold leading-tight text-white shadow-[0_10px_30px_rgba(0,0,0,.16)] backdrop-blur-xl transition active:scale-[.98]"
            >
              {say(locale, slide.secondaryButton)}
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
