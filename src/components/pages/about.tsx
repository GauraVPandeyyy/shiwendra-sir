import Image from "next/image";
import {
  Locale,
  pick,
  say,
  name,
  rsmsCompanies,
  saviorCompanies,
} from "@/content/site";
import {
  aboutStory as story,
  inspirations,
  businessIntro,
} from "@/content/about";
import { EditorialQuote, Paragraphs } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { Photo, Action, wrap } from "@/components/ui";
import { ArrowUpRight, Building2 } from "lucide-react";
import { BspMark } from "@/components/bsp-mark";
import { InspirationCard } from "@/components/inspiration-card";
const companyGroups = [
  ["SAVIOR", saviorCompanies],
  ["RSMS", rsmsCompanies],
] as const;
export function AboutPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#e5e7e3]">
        <div className="pointer-events-none absolute inset-0 pattern-grid opacity-45" />
        <div
          className="pointer-events-none absolute -left-8 top-16 font-display text-[24vw] leading-none text-navy/[.035]"
          aria-hidden="true"
        >
          SKS
        </div>
        <div
          className={`${wrap} relative grid items-end gap-6 lg:grid-cols-[1.20fr_.80fr]`}
        >
          <div className="relative z-10 py-8 lg:py-12">
            <p className="eyebrow">
              {pick(
                l,
                "शिवेन्द्र • जीवन, संघर्ष और विचार",
                "SHIWENDRA • LIFE, JOURNEY & IDEAS",
              )}
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(3rem,6vw,6.2rem)] leading-[0.95] text-navy">
              {pick(
                l,
                "संघर्ष से आत्मनिर्भरता, आत्मनिर्भरता से जनसेवा तक",
                "From self-reliance to enterprise—and a wider public purpose.",
              )}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-[1.85] text-ink/75">
              {pick(
                l,
                "एक साधारण शुरुआत से अपने लिए रास्ता बनाने की कहानी—जहाँ काम ने अनुशासन दिया, उद्यम ने जिम्मेदारी सिखाई और जनता के बीच के अनुभव ने सार्वजनिक जीवन की दिशा तय की।",
                "A story of building an independent path from an everyday beginning: work brought discipline, enterprise brought responsibility and experience among people shaped a wider direction in public life.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#life-story"
                className="ui-label inline-flex min-h-12 items-center gap-4 rounded-full bg-navy px-5 font-semibold text-white"
              >
                {pick(l, "पूरी यात्रा पढ़ें", "Read the journey")} ↓
              </a>
              <span className="ui-label rounded-full border border-navy/20 px-4 py-3 text-xs font-semibold text-blue">
                {pick(l, "बसपा • हरचंदपुर", "BSP • HARCHANDPUR")}
              </span>
            </div>
          </div>
          <Reveal
            kind="depth"
            className="portrait-shell relative mx-auto h-[520px] w-full max-w-[560px] lg:h-[650px]"
          >
            <div className="absolute inset-x-[8%] bottom-0 top-[8%] rounded-[42%_42%_6%_6%/22%_22%_4%_4%] bg-gradient-to-b from-white/85 to-[#cbd7de]" />
            <Image
              src="/images/portraits/shiwendra-composed.webp"
              alt={name(l)}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="relative z-10 object-contain object-bottom drop-shadow-[0_26px_28px_rgba(3,30,59,.16)]"
            />
            <span className="ui-label absolute bottom-6 left-2 z-20 rounded-full bg-gold px-4 py-2 text-xs font-bold text-navy shadow-lg">
              2014 → {pick(l, "उद्यम में सक्रिय", "Active in enterprise")}
            </span>
          </Reveal>
        </div>
      </section>
      <section
        id="life-story"
        className={`${wrap} -scroll-mt-16 py-20 lg:py-28`}
      >
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">01 / {pick(l, "शुरुआत", "BEGINNINGS")}</p>
            <h2 className="display-title">{say(l, story[0].title)}</h2>
            <p className="mt-7 border-l-2 border-gold pl-5 font-display text-2xl leading-relaxed text-blue">
              {say(l, story[0].lead!)}
            </p>
          </div>
          <Paragraphs
            locale={l}
            items={story[0].paragraphs}
            className="text-ink/80 not-paragraph"
          />
        </div>
        <div className="mt-10">
          <EditorialQuote
            locale={l}
            hi="अपने लिए रास्ता बनाते हुए, दूसरों की परिस्थितियों को समझना इस यात्रा का हिस्सा बनता गया।"
            en="Building an independent path deepened an understanding of the circumstances in which other people are trying to move forward."
          />
        </div>
        <div className="mt-12 grid grid-cols-1 divide-y divide-navy/20 border-y border-navy/20 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            [pick(l, "जन्म", "Born"), pick(l, "22 मई 1993", "22 May 1993")],
            [
              pick(l, "पिता", "Father"),
              pick(l, "स्वर्गीय रमेश कुमार शुक्ला", "Late Ramesh Kumar Shukla"),
            ],
            [
              pick(l, "शिक्षा", "Education"),
              pick(
                l,
                "बी.कॉम. • लखनऊ विश्वविद्यालय",
                "B.Com. • Lucknow University",
              ),
            ],
          ].map(([k, v]) => (
            <div key={k} className="py-6 md:px-6">
              <p className="mb-2 text-xs tracking-widest text-blue">{k}</p>
              <p className="text-lg font-semibold text-navy">{v}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-navy text-white">
        <div className={`${wrap} grid gap-12 py-20 lg:grid-cols-[1.1fr_.9fr]`}>
          <div>
            <p className="eyebrow !text-gold">
              02 / {pick(l, "आत्मनिर्भरता", "SELF-RELIANCE")}
            </p>
            <h2 className="display-title !text-white">
              {say(l, story[1].title)}
            </h2>
            <Paragraphs
              locale={l}
              items={story[1].paragraphs}
              className="mt-8 text-white/80"
            />
          </div>
          <Reveal kind="depth" className="self-center">
            <Photo
              src="/images/portraits/seated.webp"
              alt={pick(
                l,
                "कक्ष में बैठे शिवेन्द्र",
                "Shiwendra seated indoors",
              )}
              className="h-[520px]"
            />
            <p className="border-b border-white/25 py-5 font-display text-2xl">
              {pick(
                l,
                "सीखना, काम करना, आगे बढ़ना।",
                "Learning. Working. Moving forward.",
              )}
            </p>
          </Reveal>
        </div>
      </section>
      <section className={`${wrap} py-20`}>
        <div className="mb-12 grid gap-9 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">03 / {pick(l, "उद्यम", "ENTERPRISE")}</p>
            <h2 className="display-title">{say(l, story[2].title)}</h2>
          </div>
          <Paragraphs
            locale={l}
            items={story[2].paragraphs}
            className="text-ink/80 not-paragraph"
          />
        </div>
        <div className="grid border-t border-navy/20 md:grid-cols-3">
          {[
            ["1993", pick(l, "22 मई • जन्म", "22 May • Birth")],
            ["2012", pick(l, "बी.कॉम. की पढ़ाई पूरी", "Completion of B.Com.")],
            [
              "2014",
              pick(
                l,
                "व्यवसाय में सक्रिय यात्रा की शुरुआत",
                "Active in business from this year",
              ),
            ],
          ].map(([year, label]) => (
            <Reveal key={year} kind="line">
              <div className="border-b border-navy/20 py-7 md:px-6">
                <span className="font-display text-6xl text-blue">{year}</span>
                <p className="mt-4 text-sm">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#e8e5dc]">
        <div className={`${wrap} grid gap-12 py-20 lg:grid-cols-2`}>
          <div>
            <p className="eyebrow">04 / {pick(l, "विचार", "VALUES")}</p>
            <h2 className="display-title">{say(l, story[3].title)}</h2>
            <Paragraphs
              locale={l}
              items={story[3].paragraphs}
              className="mt-8 text-ink/80"
            />
          </div>
          <div className="flex flex-col justify-between border-l border-navy/20 pl-8">
            <span
              className="font-display text-[120px] leading-none text-gold"
              aria-hidden="true"
            >
              “
            </span>
            <p className="font-display p-center text-4xl leading-snug text-navy lg:text-5xl">
              {pick(
                l,
                "सार्थक सेवा में व्यक्ति का सम्मान केंद्र में रहे।",
                "Keep the person’s dignity at the centre of service.",
              )}
            </p>
            <p className="mt-8 text-xs uppercase tracking-widest text-blue">
              {pick(
                l,
                "जनसेवा की दृष्टि • संपादकीय सार",
                "SERVICE PHILOSOPHY • EDITORIAL SUMMARY",
              )}
            </p>
          </div>
        </div>
      </section>
      <section className={`${wrap} py-20`}>
        <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">
              05 / {pick(l, "सार्वजनिक भूमिका", "PUBLIC ROLE")}
            </p>
            <h2 className="display-title">{say(l, story[4].title)}</h2>
            <div className="mt-9 flex items-center gap-5">
              <span className="grid h-20 w-24 place-items-center rounded-[2rem] border border-navy/15 bg-white/60">
                <BspMark
                  locale={l}
                  decorative
                  className="h-14 w-auto opacity-75"
                />
              </span>
              <p className="max-w-56 not-paragraph text-sm leading-relaxed text-blue">
                {pick(
                  l,
                  "बहुजन समाज पार्टी • हरचंदपुर, रायबरेली",
                  "Bahujan Samaj Party • Harchandpur, Rae Bareli",
                )}
              </p>
            </div>
          </div>
          <Paragraphs
            locale={l}
            items={story[4].paragraphs}
            className="text-ink/80"
          />
        </div>
      </section>
      <section
        id="inspirations"
        className="relative overflow-hidden -scroll-mt-16 bg-[#071b35] text-white"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(11,94,170,.28),transparent_32%),radial-gradient(circle_at_90%_70%,rgba(198,154,69,.12),transparent_28%)]" />
        <div className={`${wrap} relative py-20 lg:py-28`}>
          <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow !text-gold">
                06 / {pick(l, "विचारों की प्रेरणा", "SOURCES OF INSPIRATION")}
              </p>
              <h2 className="display-title !text-white">
                {pick(
                  l,
                  "समानता, सामाजिक न्याय और जनप्रतिनिधित्व की प्रेरक परंपरा",
                  "A tradition of equality, social justice and public representation",
                )}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-[1.9] text-white/72 lg:justify-self-end">
              {pick(
                l,
                "सार्वजनिक जीवन की दिशा केवल एक व्यक्ति से नहीं बनती। सामाजिक न्याय, शिक्षा, आत्मसम्मान, संगठन और समान अवसर के लिए अलग-अलग समय में काम करने वाले इन व्यक्तित्वों के विचार शिवेन्द्र कुमार शुक्ला की सार्वजनिक सोच के महत्वपूर्ण संदर्भ हैं।",
                "Public life is shaped by more than one individual. The work of leaders and reformers associated with social justice, education, dignity, organisation and equal opportunity provides an important intellectual context for Shiwendra Kumar Shukla’s public outlook.",
              )}
            </p>
          </div>

          <div className="mt-12 grid auto-rows-[minmax(290px,auto)] gap-4 lg:grid-cols-12">
            {inspirations.map((p, i) => {
              const lead = i === 0;
              const side = i === 1 || i === 2;

              return (
                <Reveal
                  key={p.id}
                  kind={lead ? "mask" : i % 2 ? "depth" : "line"}
                  className={
                    lead
                      ? "lg:col-span-7 lg:row-span-2"
                      : side
                        ? "lg:col-span-5"
                        : "lg:col-span-4"
                  }
                >
                  <InspirationCard
                    item={p}
                    index={i}
                    locale={l}
                    lead={lead}
                    side={side}
                  />
                </Reveal>
              );
            })}
          </div>

          {/* <p className="mt-9 border-t border-white/15 pt-5 text-[10px] leading-relaxed text-white/55">
            {pick(
              l,
              "चित्र स्रोत/श्रेय: Wikimedia Commons — Mayawati (GODL-India), Kanshi Ram (CC BY-SA), Dr. B. R. Ambedkar, Narayana Guru (Public Domain), Jyotirao Phule (CC0/Public Domain) और Chhatrapati Shahu Maharaj (Public Domain)।",
              "Image sources/credits: Wikimedia Commons — Mayawati (GODL-India), Kanshi Ram (CC BY-SA), Dr. B. R. Ambedkar, Narayana Guru (Public Domain), Jyotirao Phule (CC0/Public Domain) and Chhatrapati Shahu Maharaj (Public Domain).",
            )}
          </p> */}
        </div>
      </section>
      <section id="business" className={`${wrap} -scroll-mt-16 py-20 lg:py-28`}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">
              07 / {pick(l, "व्यावसायिक नेतृत्व", "BUSINESS LEADERSHIP")}
            </p>
            <h2 className="display-title">
              {pick(
                l,
                "दो समूह। दस उद्यम। एक व्यापक दृष्टि।",
                "Two groups. Ten enterprises. A wider perspective.",
              )}
            </h2>
          </div>
          <Paragraphs
            locale={l}
            items={businessIntro}
            className="text-ink/75"
          />
        </div>
        {companyGroups.map(([group, companies], gi) => (
          <div key={group as string} className="mt-14">
            <div className="mb-6 flex items-end justify-between border-b border-navy/25 pb-5">
              <h3 className="text-3xl font-semibold tracking-wider text-navy">
                {group}{" "}
                <span className="block pt-2 text-xs font-normal tracking-[.2em]">
                  GROUP OF COMPANIES
                </span>
              </h3>
              <span className="font-display text-5xl text-gold">
                0{companies.length}
              </span>
            </div>
            <div
              className={`grid gap-px bg-navy/15 sm:grid-cols-2 ${gi === 1 ? "xl:grid-cols-3" : ""}`}
            >
              {companies.map((company, i) => (
                <article
                  key={company.name}
                  className={`group relative min-h-[250px] overflow-hidden p-6 transition-all duration-500 motion-safe:hover:-translate-y-1 ${gi === 0 ? "bg-navy text-white" : "bg-[#eae7df] text-navy"}`}
                >
                  <span className="pointer-events-none absolute -right-2 -top-8 font-display text-[7rem] leading-none opacity-[.055]">
                    0{i + 1}
                  </span>
                  <div className="mb-7 flex items-center justify-between">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border ${gi === 0 ? "border-white/20 bg-white/5" : "border-navy/15 bg-white/35"}`}
                    >
                      <Building2
                        strokeWidth={1.3}
                        className="text-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                      />
                    </span>
                    <span className="ui-label text-xs font-semibold tracking-widest opacity-60">
                      {group} / 0{i + 1}
                    </span>
                  </div>
                  <p className="ui-label mb-3 text-[11px] font-bold uppercase tracking-[.12em] text-gold">
                    {say(l, company.sector)}
                  </p>
                  <h4
                    lang="en"
                    className="relative max-w-md text-lg font-semibold leading-relaxed"
                  >
                    {company.name}
                  </h4>
                  <p
                    className={`mt-4 text-sm leading-[1.75] ${gi === 0 ? "text-white/70" : "text-ink/70"}`}
                  >
                    {say(l, company.description)}
                  </p>
                  <span className="absolute bottom-0 left-0 h-[3px] w-10 bg-gold transition-all duration-500 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="border-t border-navy/20 bg-[#e1e8ee]">
        <div
          className={`${wrap} flex flex-col items-start gap-7 py-16 lg:flex-row lg:items-end lg:justify-between`}
        >
          <p className="max-w-3xl font-display text-3xl leading-snug text-navy sm:text-4xl">
            {pick(
              l,
              "अनुभव की सार्थकता, जब वह जनता की बात समझने में काम आए।",
              "Experience matters when it helps us understand people.",
            )}
          </p>
          <Action href={`/${l}/contact`}>
            {pick(l, "संवाद का हिस्सा बनें", "Join the conversation")}
            <ArrowUpRight className="sr-only" />
          </Action>
        </div>
      </section>
    </>
  );
}
