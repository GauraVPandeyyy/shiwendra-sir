import { Locale, pick, say } from "@/content/site";
import { constituencyStory as s, priorities } from "@/content/harchandpur";
import { Paragraphs, ThemeImage } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { Action, wrap } from "@/components/ui";
import {
  Route,
  Waves,
  Sprout,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  MessagesSquare,
  ArrowUpRight,
} from "lucide-react";
import { getImageProps } from "next/image";
import { BspMark } from "@/components/bsp-mark";
const icons = [
  Route,
  Waves,
  Sprout,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  MessagesSquare,
];
export function HarchandpurPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        {(() => {
          const desktop = getImageProps({
            src: "/images/hero/pp3.jpeg",
            alt: "",
            width: 1672,
            height: 941,
            priority: true,
            sizes: "100vw",
          }).props;
          const mobile = getImageProps({
            src: "/images/hero/dd3.jpeg",
            alt: "",
            width: 1080,
            height: 1920,
            priority: true,
            sizes: "100vw",
          }).props;
          return (
            <div className="absolute inset-0">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet={mobile.srcSet}
                  sizes="100vw"
                />
                <img
                  {...desktop}
                  alt=""
                  className="absolute bottom-0 inset-0 h-full w-full object-cover object-center"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-b from-navy/94 via-navy/54 via-45% to-navy/12 lg:bg-gradient-to-r lg:from-navy lg:via-navy/82 lg:via-48% lg:to-transparent lg:to-74%" />
            </div>
          );
        })()}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-[34%] opacity-[.07] lg:left-[4%] lg:top-[8%]"
        >
          <BspMark
            locale={l}
            decorative
            className="h-auto w-[44vw] max-w-[460px] brightness-0 invert"
          />
        </div>
        <div
          className={`${wrap} relative flex min-h-[720px] flex-col justify-start pb-[44%] pt-8 sm:min-h-[780px] sm:pt-20 lg:block lg:min-h-0 lg:py-28`}
        >
          <div className="max-w-[58%] max-lg:max-w-full">
            <p className="eyebrow !text-gold">
              {pick(l, "रायबरेली • उत्तर प्रदेश", "RAE BARELI • UTTAR PRADESH")}
            </p>
            <h1
              className={`text-[clamp(3.2rem,14vw,5.2rem)] leading-[1.02] lg:text-[clamp(4.5rem,7vw,7.5rem)] ${l === "hi" ? "signature-title" : "font-display"}`}
            >
              {pick(l, "हरचंदपुर", "Harchandpur")}
            </h1>
            <p className="ui-label mt-4 inline-flex border border-gold/60 bg-navy/45 px-3 py-1 text-[11px] font-bold tracking-[.08em] text-gold backdrop-blur-sm">
              {pick(
                l,
                "विधानसभा क्षेत्र 179 • रायबरेली",
                "ASSEMBLY CONSTITUENCY 179 • RAE BARELI",
              )}
            </p>
            <p className="mt-3 max-w-xl font-display text-2xl leading-[1.35] sm:text-3xl">
              {pick(
                l,
                "जनता की जरूरत से विकास की स्पष्ट दिशा तक",
                "From local needs to a clear development direction",
              )}
            </p>
            <p className="mt-2 max-w-lg text-sm leading-[1.8] text-white/82 sm:text-base">
              {pick(
                l,
                "शिवेन्द्र कुमार शुक्ला • बसपा प्रभारी/प्रत्याशी, हरचंदपुर",
                "Shiwendra Kumar Shukla • BSP In-charge / Candidate, Harchandpur",
              )}
            </p>
            <Action light href="#priorities">
              {pick(l, "सात विकास प्राथमिकताएँ", "Explore seven priorities")}
            </Action>
          </div>
        </div>
      </section>
      <section
        id="vision"
        className={`${wrap} -scroll-mt-16 grid gap-10 py-20 lg:grid-cols-[.8fr_1.2fr]`}
      >
        <div>
          <p className="eyebrow">
            {pick(l, "क्षेत्र को समझना", "UNDERSTANDING THE CONSTITUENCY")}
          </p>
          <h2 className="display-title">{say(l, s[0].title)}</h2>
        </div>
        <Paragraphs
          locale={l}
          items={s[0].paragraphs}
          className="text-ink/80"
        />
      </section>
      <section className="bg-[#e5e7e4]">
        <div className={`${wrap} grid gap-10 py-16 lg:grid-cols-2`}>
          <h2 className="display-title">{say(l, s[1].title)}</h2>
          <Paragraphs
            locale={l}
            items={s[1].paragraphs}
            className="text-ink/80"
          />
        </div>
      </section>
      <section
        id="priorities"
        className={`${wrap} -scroll-mt-16 py-20 lg:py-28`}
      >
        <p className="eyebrow">
          {pick(l, "विकास की प्राथमिकताएँ", "DEVELOPMENT PRIORITIES")}
        </p>
        <h2 className="mb-12 max-w-3xl display-title">
          {pick(
            l,
            "हरचंदपुर के विकास की सात प्रमुख दिशाएँ",
            "Seven priorities for a stronger Harchandpur.",
          )}
        </h2>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {priorities.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                kind={i % 2 ? "depth" : "line"}
                key={p.id}
                className={`${i % 2 ? "lg:mt-20" : ""} ${i === 6 ? "lg:col-span-2 lg:max-w-none" : ""}`}
              >
                <article
                  id={p.id}
                  className={`group relative overflow-hidden border border-navy/20 ${i === 6 ? "bg-navy text-white" : "bg-[#eeece5] text-navy"}`}
                >
                  <div
                    className={`${i === 6 ? "lg:grid lg:grid-cols-[.7fr_1.3fr]" : ""}`}
                  >
                    <div
                      className={`relative overflow-hidden ${p.image ? "" : "pattern-grid"} ${i === 6 ? "min-h-56" : "h-56"}`}
                    >
                      {p.image ? (
                        <ThemeImage
                          theme={p.image}
                          locale={l}
                          className="h-full"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-between p-8">
                          <Icon
                            size={110}
                            strokeWidth={0.7}
                            className="opacity-40 transition-transform duration-700 motion-safe:group-hover:rotate-6"
                          />
                          <span
                            className="font-display text-[110px] leading-none text-gold/70 transition-transform duration-700 motion-safe:group-hover:-translate-y-2"
                            aria-hidden="true"
                          >
                            0{i + 1}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="relative p-6 sm:p-8">
                      <div className="mb-5 flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold tracking-widest ${i === 6 ? "text-gold" : "text-blue"}`}
                        >
                          0{i + 1}
                        </span>
                        <Icon size={22} className="text-gold" />
                      </div>
                      <h3 className="font-display text-3xl leading-snug sm:text-4xl">
                        {say(l, p.title)}
                      </h3>
                      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div
                          className={`border-l-2 pl-4 ${i === 6 ? "border-white/25" : "border-blue/35"}`}
                        >
                          <p
                            className={`ui-label mb-2 text-[11px] font-bold uppercase tracking-[.12em] ${i === 6 ? "text-gold" : "text-blue"}`}
                          >
                            {pick(l, "आज की जरूरत", "THE NEED")}
                          </p>
                          <p className="text-sm leading-[1.8] opacity-80">
                            {say(l, p.context)}
                          </p>
                        </div>
                        <div className="border-l-2 border-gold pl-4">
                          <p className="ui-label mb-2 text-[11px] font-bold uppercase tracking-[.12em] text-gold">
                            {pick(l, "विकास की दिशा", "DEVELOPMENT DIRECTION")}
                          </p>
                          <p className="text-sm leading-[1.8] opacity-88">
                            {say(l, p.direction)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="absolute bottom-0 left-0 h-[3px] w-12 bg-gold transition-all duration-700 group-hover:w-full" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="bg-[#dbe4e9]">
        <div
          className={`${wrap} grid gap-10 py-20 lg:grid-cols-[.85fr_1.15fr]`}
        >
          <div>
            <p className="eyebrow">
              {pick(l, "समेकित विकास", "INTEGRATED DEVELOPMENT")}
            </p>
            <h2 className="display-title">{say(l, s[2].title)}</h2>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-blue">
              {[Route, HeartPulse, GraduationCap, BriefcaseBusiness].map(
                (Icon, i) => (
                  <span
                    key={i}
                    className="grid h-16 w-16 place-items-center rounded-full border border-blue/30"
                  >
                    <Icon strokeWidth={1} />
                  </span>
                ),
              )}
            </div>
          </div>
          <Paragraphs
            locale={l}
            items={s[2].paragraphs}
            className="text-ink/80"
          />
        </div>
      </section>
      <section className={`${wrap} py-20`}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">
              {pick(l, "सार्वजनिक कार्यशैली", "PUBLIC WORKING STYLE")}
            </p>
            <h2 className="display-title">{say(l, s[3].title)}</h2>
          </div>
          <Paragraphs
            locale={l}
            items={s[3].paragraphs}
            className="text-ink/80"
          />
        </div>
      </section>
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="absolute right-0 top-0 font-display text-[40vw] leading-none text-white/[.035]"
          aria-hidden="true"
        >
          भारत
        </div>
        <div className={`${wrap} relative py-20 lg:py-28`}>
          <p className="eyebrow !text-gold">
            {pick(
              l,
              "उद्देश्य • प्राथमिकता • संकल्प",
              "PURPOSE • PRIORITY • COMMITMENT",
            )}
          </p>
          <h2 className="sr-only">
            {pick(l, "भारत के लिए दृष्टि", "A vision for India")}
          </h2>
          <div className="relative border-l border-gold/50 pl-7 sm:pl-12">
            {[
              [
                HeartPulse,
                "स्वस्थ भारत हमारा उद्देश्य",
                "A healthy India is our purpose",
              ],
              [
                GraduationCap,
                "शिक्षित भारत हमारी प्राथमिकता",
                "An educated India is our priority",
              ],
              [
                Sprout,
                "समृद्ध भारत हमारा संकल्प",
                "A prosperous India is our commitment",
              ],
            ].map(([I, hi, en], i) => {
              const Icon = I as typeof HeartPulse;
              return (
                <Reveal key={i} kind="line">
                  <div className="relative border-b border-white/20 py-9">
                    <span className="absolute -left-[35px] top-12 h-3 w-3 rounded-full bg-gold sm:-left-[55px]" />
                    <Icon className="mb-4 text-gold" />
                    <p className="max-w-5xl font-display text-3xl leading-snug sm:text-5xl lg:text-6xl">
                      {pick(l, hi as string, en as string)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className={`${wrap} py-20`}>
        <div className="grid items-center gap-9 border-b-2 border-gold pb-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">
              {pick(l, "हरचंदपुर की भागीदारी", "HARCHANDPUR PARTICIPATES")}
            </p>
            <h2 className="font-display text-4xl leading-snug text-navy">
              {pick(
                l,
                "आपके क्षेत्र में क्या जरूरी है?",
                "What matters in your area?",
              )}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">
              {pick(
                l,
                "अपने गाँव या क्षेत्र का नाम, विषय और उसका असर साझा करें। आपका अनुभव स्थानीय जरूरत को समझने में उपयोगी है।",
                "Share the name of your village or area, the issue and its impact. Your experience helps explain the local need.",
              )}
            </p>
          </div>
          <Action href={`/${l}/contact`}>
            {pick(l, "अपनी बात रखें", "Raise your concern")}
            <ArrowUpRight className="sr-only" />
          </Action>
        </div>
      </section>
    </>
  );
}
