import Image from "next/image";

import { Locale, pick, say, name } from "@/content/site";

import { homeCopy as c } from "@/content/home";

import Hero from "@/components/Hero/Hero";

import { Action, Photo, wrap } from "@/components/ui";

import { Paragraphs } from "@/components/editorial";

import { Reveal } from "@/components/reveal";

import { HeartPulse, MapPin } from "lucide-react";

import { SocialMediaUpdate } from "@/components/social-media-update";

import { BspMark } from "@/components/bsp-mark";
export function HomePage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <Hero locale={l} />
      <div className="bg-blue text-white">
        <div
          className={`${wrap} grid grid-cols-[auto_1fr] items-center gap-5 py-6 md:grid-cols-[auto_1fr_auto]`}
        >
          <BspMark
            locale={l}
            decorative
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="text-sm sm:text-base">
            {pick(
              l,
              "हरचंदपुर विधानसभा • रायबरेली, उत्तर प्रदेश",
              "Harchandpur Vidhan Sabha • Rae Bareli, Uttar Pradesh",
            )}
            <span className="mt-1 block text-white/70">
              {pick(
                l,
                "जनसरोकार से जुड़े नेतृत्व की दिशा",
                "A public direction grounded in people’s concerns",
              )}
            </span>
          </p>
          <span className="hidden border-l border-white/30 pl-7 text-sm md:block">
            {pick(l, "संवाद से शुरुआत", "Begin with dialogue")}
          </span>
        </div>
      </div>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-10 top-10 h-72 w-72 rounded-full border border-navy/[.06]"
          aria-hidden="true"
        />
        <div
          className={`${wrap} relative grid gap-14 py-20 lg:grid-cols-[.72fr_1.28fr] lg:py-28`}
        >
          <Reveal
            kind="depth"
            className="portrait-shell relative mx-auto min-h-[500px] w-full max-w-[560px] sm:min-h-[610px]"
          >
            <div className="absolute inset-x-[7%] bottom-0 top-[10%] overflow-hidden rounded-[46%_46%_7%_7%/22%_22%_5%_5%] bg-gradient-to-b from-[#eef3f3] via-[#d9e3e5] to-[#c6d3d8] shadow-[0_28px_60px_rgba(6,47,99,.12)]" />
            <div className="absolute left-[4%] top-[7%] sm:top-[14%] z-20 rounded-full border border-navy/15 bg-ivory/90 px-4 py-2 text-xs font-semibold text-blue shadow-sm backdrop-blur-sm">
              BSP • HARCHANDPUR
            </div>
            <Image
              src="/images/gallery/profile.png"
              alt={name(l)}
              fill
              sizes="(max-width: 1023px) 100vw, 44vw"
              className="relative z-10 object-contain object-bottom drop-shadow-[0_24px_24px_rgba(4,28,55,.15)]"
            />
            <div className="absolute bottom-5 left-[0%] right-[0%] z-20 flex items-end justify-between gap-4 border-t border-white/50 bg-navy/88 px-5 py-4 text-white backdrop-blur-md">
              <div>
                <span className="ui-label block text-[10px] font-bold tracking-[.13em] text-gold">
                  {pick(
                    l,
                    "बसपा प्रभारी/प्रत्याशी",
                    "BSP IN-CHARGE / CANDIDATE",
                  )}
                </span>
                <span className="mt-1 block font-display text-xl">
                  {name(l)}
                </span>
              </div>
              <BspMark
                locale={l}
                decorative
                className="h-11 w-auto brightness-0 invert opacity-80"
              />
            </div>
          </Reveal>
          <div className="self-center">
            <p className="eyebrow">{say(l, c.intro.kicker)}</p>
            <h2 className="display-title">{say(l, c.intro.title)}</h2>
            <Paragraphs
              locale={l}
              items={c.intro.paragraphs}
              className="mt-7 text-ink/80"
            />
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                pick(l, "जननेतृत्व", "Public leadership"),
                pick(l, "समाजसेवा", "Public service"),
                pick(l, "व्यावसायिक अनुभव", "Professional experience"),
              ].map((item, i) => (
                <span
                  key={item}
                  className={`ui-label rounded-full border px-4 py-2 text-xs font-semibold ${i === 0 ? "border-gold bg-gold/10 text-navy" : "border-navy/15 text-blue"}`}
                >
                  {item}
                </span>
              ))}
            </div>
            <Action href={`/${l}/about`}>
              {pick(l, "शिवेन्द्र को जानिए", "Meet Shiwendra")}
            </Action>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-[#e9e6dd]">
        <div
          className={`${wrap} grid gap-12 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24`}
        >
          <div>
            <p className="eyebrow">
              {pick(
                l,
                "अनुभव से सार्वजनिक जीवन तक",
                "EXPERIENCE INTO PUBLIC PURPOSE",
              )}
            </p>
            <h2 className="display-title">{say(l, c.journey.title)}</h2>
            <Paragraphs
              locale={l}
              items={c.journey.paragraphs}
              className="mt-7 text-ink/80"
            />
          </div>
          <div className="relative flex min-h-72 flex-col justify-center border-l border-navy/25 pl-8">
            <div
              className="absolute right-0 top-0 font-display text-[140px] text-navy/[.06]"
              aria-hidden="true"
            >
              2014
            </div>
            {[
              [
                pick(l, "जिम्मेदारी", "Responsibility"),
                pick(l, "अपने अनुभव से सीखना", "Learning from experience"),
              ],
              [
                pick(l, "संवेदना", "Compassion"),
                pick(
                  l,
                  "जनता की परिस्थिति समझना",
                  "Understanding people’s circumstances",
                ),
              ],
              [
                pick(l, "सहभागिता", "Participation"),
                pick(l, "सार्वजनिक जीवन में संवाद", "Dialogue in public life"),
              ],
            ].map(([a, b], i) => (
              <Reveal kind="line" key={a}>
                <div className="relative border-b border-navy/20 py-6">
                  <span className="absolute -left-10 top-9 h-4 w-4 rounded-full border-4 border-[#e9e6dd] bg-gold" />
                  <span className="text-xs text-blue">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-3xl">{a}</h3>
                  <p className="mt-2 text-sm text-ink/70">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
      BSP FLAG
  ========================================================== */}

      <section className="relative isolate overflow-hidden bg-[#173A98] text-white">
        {/* =========================================================
      REAL BSP FLAG — NO CUSTOM PARTY ARTWORK
  ========================================================== */}
        {/* <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src="/images/inspirations/bsp_flag.png"
            alt=""
            fill
            sizes="100vw"
            className="object-fill object-center opacity-[0.26]"
          />

         
          <div className="absolute inset-0 bg-gradient-to-r from-[#092d7d]/95 via-[#123b92]/90 to-[#173a98]/58" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08286e]/70 via-transparent to-[#092c75]/20" />
        </div> */}

        {/* subtle top/bottom party bands */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-white/90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] bg-white/80"
        />

        <div
          className={`
      ${wrap}
      relative
      grid
      min-h-[520px]
      items-stretch
      gap-0
      py-0
      lg:min-h-[590px]
      lg:grid-cols-[minmax(0,1fr)_390px]
      xl:grid-cols-[minmax(0,1fr)_430px]
    `}
        >
          {/* =========================================================
        LEFT — POLITICAL IDENTITY
    ========================================================== */}
          <div
            className="
        relative z-10
        flex flex-col justify-center
        py-14
        pr-0
        sm:py-16
        lg:py-20
        lg:pr-16
        xl:pr-20
      "
          >
            {/* Party identity line */}
            <Reveal kind="line">
              <div
                className="
            mb-7
            flex flex-wrap items-center
            gap-x-4 gap-y-3
          "
              >
                {/* REAL BSP ELECTION SYMBOL */}
                <div
                  className="
              grid h-[74px] w-[82px]
              shrink-0 place-items-center
              bg-white
              
              shadow-[0_14px_35px_rgba(0,0,0,.18)]
              sm:h-[82px] sm:w-[92px]
            "
                >
                  <Image
                    src="/images/inspirations/bsp_flag.png"
                    alt={pick(
                      l,
                      "बहुजन समाज पार्टी का चुनाव चिन्ह हाथी",
                      "Bahujan Samaj Party election symbol — Elephant",
                    )}
                    width={413}
                    height={369}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <p
                    className="
                ui-label
                text-[10px]
                font-bold uppercase
                tracking-[.18em]
                text-[#f5d36a]
                sm:text-[11px]
              "
                  >
                    {pick(l, "राजनीतिक पहचान", "POLITICAL IDENTITY")}
                  </p>

                  <p
                    className="
                mt-1.5
                text-sm font-semibold
                text-white
                sm:text-base
              "
                  >
                    {pick(l, "बहुजन समाज पार्टी", "Bahujan Samaj Party")}
                  </p>

                  <p
                    className="
                mt-1 text-xs
                font-medium
                text-white/70
                sm:text-sm
              "
                  >
                    {pick(
                      l,
                      "प्रभारी/प्रत्याशी • हरचंदपुर",
                      "In-charge / Candidate • Harchandpur",
                    )}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Main heading */}
            <Reveal kind="depth">
              <h2
                className="
            max-w-[820px]
            font-display
            text-[2.4rem]
            leading-[1.32]
            tracking-[-0.02em]
            text-white
            sm:text-[3rem]
            lg:text-[3.65rem]
            xl:text-[4rem]
          "
              >
                {l === "hi" ? (
                  <>
                    बसपा के साथ,
                    <span className="block text-[#f5d36a]">
                      हरचंदपुर के लिए
                    </span>
                  </>
                ) : (
                  <>
                    With the BSP,
                    <span className="block text-[#f5d36a]">
                      for the people of Harchandpur
                    </span>
                  </>
                )}
              </h2>
            </Reveal>

            {/* divider */}
            <Reveal kind="line">
              <div className="my-5 flex items-center gap-3">
                <span className="h-[3px] w-14 bg-[#f5d36a]" />
                <span className="h-px w-20 bg-white/30" />
              </div>
            </Reveal>

            {/* Richer political copy */}
            <Reveal kind="depth">
              <p
                className="
            max-w-[790px]
            text-[15px]
            leading-[1.95]
            text-white/82
            sm:text-[16px]
            lg:text-[17px]
          "
              >
                {pick(
                  l,
                  "बहुजन समाज पार्टी के प्रभारी/प्रत्याशी के रूप में शिवेन्द्र कुमार शुक्ला हरचंदपुर के सम्मानित जनता की समस्याओं, अपेक्षाओं और विकास से जुड़ी प्राथमिकताओं को जिम्मेदार जनसंवाद के माध्यम से आगे रखने की दिशा में सक्रिय हैं। सामाजिक न्याय, समान अवसर और जनता की भागीदारी के मूल विचार के साथ उनका प्रयास ऐसा सार्वजनिक जुड़ाव विकसित करना है, जिसमें क्षेत्र की आवाज सीधे सुनी जाए और स्थानीय मुद्दों को प्रभावी ढंग से आगे रखा जाए।",
                  "As the Bahujan Samaj Party's In-charge / Candidate for Harchandpur, Shiwendra Kumar Shukla is focused on carrying the concerns, aspirations and development priorities of local people forward through responsible public dialogue, with social justice, equal opportunity and citizen participation at the centre of that approach.",
                )}
              </p>
            </Reveal>

            {/* Political principles — no generic pills */}
            <Reveal kind="line">
              <div
                className="
            mt-8
            flex flex-wrap
            items-center
            gap-y-3
            text-sm
            font-semibold
            text-white
          "
              >
                <span>{pick(l, "सामाजिक न्याय", "Social Justice")}</span>

                <span className="mx-4 h-4 w-px bg-white/35" />

                <span>{pick(l, "समान अवसर", "Equal Opportunity")}</span>

                <span className="mx-4 hidden h-4 w-px bg-white/35 sm:block" />

                <span>{pick(l, "जनभागीदारी", "Public Participation")}</span>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal kind="depth">
              <div className="mt-9">
                <Action light href={`/${l}/harchandpur`}>
                  {pick(
                    l,
                    "हरचंदपुर के लिए विकास की दिशा",
                    "Development vision for Harchandpur",
                  )}
                </Action>
              </div>
            </Reveal>
          </div>

          {/* =========================================================
        RIGHT — MAYAWATI / BSP LEADERSHIP
        No circle. No arch. No generic card.
    ========================================================== */}
          <Reveal
            kind="depth"
            className="
        relative
        min-h-[470px]
        overflow-hidden
        border-t border-white/15
        lg:min-h-full
        lg:border-l
        lg:border-t-0
        lg:border-white/15
      "
          >
            {/* Mayawati actual photograph */}
            <Image
              src="/images/inspirations/mayawati_ji.png"
              alt={pick(
                l,
                "बहुजन समाज पार्टी की राष्ट्रीय अध्यक्ष मायावती",
                "Mayawati, National President of the Bahujan Samaj Party",
              )}
              fill
              sizes="(max-width: 1024px) 100vw, 430px"
              className="
          object-cover
          object-[center_20%]
          grayscale-[0.03]
        "
            />

            {/* only readability overlays */}
            <div
              aria-hidden="true"
              className="
          absolute inset-0
          bg-gradient-to-t
          from-[#071d5b]/95
          via-[#102b78]/10
          to-transparent
        "
            />

            <div
              aria-hidden="true"
              className="
          absolute inset-y-0 left-0
          hidden w-24
          bg-gradient-to-r
          from-[#173A98]
          to-transparent
          lg:block
        "
            />

            {/* actual BSP flag mark */}
            {/* <div
              className="
          absolute
          right-5 top-5
          w-[108px]
          overflow-hidden
          border border-white/25
          bg-white
          shadow-xl
          sm:w-[126px]
        "
            >
              <Image
                src="/images/inspirations/bsp_flag.png"
                alt={pick(
                  l,
                  "बहुजन समाज पार्टी का ध्वज",
                  "Bahujan Samaj Party flag",
                )}
                width={512}
                height={341}
                className="h-auto w-full"
              />
            </div> */}

            {/* Leadership identity */}
            <div
              className="
          absolute
          inset-x-0 bottom-0
          z-10
          p-6
          sm:p-8
          lg:p-8
        "
            >
              <p
                className="
            text-[10px]
            font-bold uppercase
            tracking-[.18em]
            text-[#f5d36a]
          "
              >
                {pick(
                  l,
                  "बहुजन समाज पार्टी का नेतृत्व",
                  "BAHUJAN SAMAJ PARTY LEADERSHIP",
                )}
              </p>

              <h3
                className="
            mt-2
            font-display
            text-3xl
            leading-tight
            text-white
            sm:text-4xl
          "
              >
                {pick(l, "सुश्री मायावती जी", "Mayawati")}
              </h3>

              <p
                className="
            mt-2
            text-sm font-medium
            text-white/75
          "
              >
                {pick(
                  l,
                  "राष्ट्रीय अध्यक्ष • बहुजन समाज पार्टी",
                  "National President • Bahujan Samaj Party",
                )}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#f5d36a]" />
                <span
                  className="
              max-w-[260px]
              text-xs leading-5
              text-white/70
            "
                >
                  {pick(
                    l,
                    "सामाजिक न्याय, प्रतिनिधित्व और संगठनात्मक नेतृत्व की राजनीतिक परंपरा।",
                    "A political tradition centred on social justice, representation and organisation.",
                  )}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${wrap} py-20 lg:py-28`}>
        <div className="mb-9 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">
              {pick(l, "जनसेवा की एक झलक", "A GLIMPSE OF SERVICE")}
            </p>
            <h2 className="display-title">{say(l, c.service.title)}</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-ink/75">
            {say(l, c.service.body)}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {/* <ThemeImage
              theme="healthcare"
              locale={l}
              className="h-[360px] lg:h-[480px]"
            /> */}
            <figure
              className={`group relative overflow-hidden bg-navy h-[360px] lg:h-[480px]`}
            >
              <Image
                src={`/images/social-service/healthcare-home.png`}
                alt={pick(
                  l,
                  "सेवा के विषय का प्रतीकात्मक चित्र",
                  "Representative illustration of a service theme",
                )}

                fill
                sizes="(max-width: 767px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
              {/* <figcaption className="ui-label absolute bottom-3 left-3 border border-white/20 bg-navy/85 px-2.5 py-1.5 text-[11px] text-white backdrop-blur-sm">
                    {pick(l, "प्रतीकात्मक चित्र", "Representative image")}
                  </figcaption> */}
            </figure>
          </Reveal>
          <div className="flex flex-col bg-navy text-white">
            {/* <ThemeImage theme="education" locale={l} className="h-60 lg:h-64" /> */}
            <figure
              className={`group relative overflow-hidden bg-navy h-60 lg:h-64`}
            >
              <Image
                src={`/images/social-service/edu3.png`}
                alt={pick(
                  l,
                  "सेवा के विषय का प्रतीकात्मक चित्र",
                  "Representative illustration of a service theme",
                )}
                fill
                sizes="(max-width: 767px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
              {/* <figcaption className="ui-label absolute bottom-3 left-3 border border-white/20 bg-navy/85 px-2.5 py-1.5 text-[11px] text-white backdrop-blur-sm">
                    {pick(l, "प्रतीकात्मक चित्र", "Representative image")}
                  </figcaption> */}
            </figure>
            <div className="p-7">
              <HeartPulse className="mb-4 text-gold" />
              <p className="font-display text-3xl">
                {pick(l, "सहयोग, सम्मान के साथ", "Support, with dignity")}
              </p>
              <Action light href={`/${l}/janseva`}>
                {pick(l, "जनसेवा के सरोकार", "Explore public service")}
              </Action>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 opacity-[.055]"
          aria-hidden="true"
        >
          <BspMark
            locale={l}
            decorative
            className="h-auto w-[420px] brightness-0 invert"
          />
        </div>
        <div
          className={`${wrap} relative grid gap-10 py-20 lg:grid-cols-[1.2fr_.8fr] lg:py-28`}
        >
          <div>
            <p className="eyebrow !text-gold">
              {pick(
                l,
                "हरचंदपुर का सार्वजनिक भविष्य",
                "HARCHANDPUR’S PUBLIC FUTURE",
              )}
            </p>
            <h2 className="display-title !text-white">
              {say(l, c.vision.title)}
            </h2>
          </div>
          <div className="self-center">
            <MapPin className="mb-6 text-gold" size={38} />
            <p className="text-lg leading-relaxed text-white/80">
              {say(l, c.vision.body)}
            </p>
            <Action light href={`/${l}/harchandpur`}>
              {pick(
                l,
                "हरचंदपुर की दिशा देखें",
                "Explore Harchandpur’s direction",
              )}
            </Action>
          </div>
        </div>
      </section>
      <SocialMediaUpdate locale={l} />
      <section className="border-y border-navy/15 bg-[#eeece5]">
        <div className={`${wrap} grid gap-8 py-12 lg:grid-cols-[.6fr_1.4fr]`}>
          <div className="flex gap-7">
            <p>
              <span className="block font-display text-6xl text-navy">02</span>
              {pick(l, "समूह", "Groups")}
            </p>
            <p>
              <span className="block font-display text-6xl text-navy">10</span>
              {pick(l, "उद्यम", "Enterprises")}
            </p>
          </div>
          <div>
            <p className="mb-4 text-xl font-semibold tracking-wider text-navy">
              SAVIOR <span className="px-4 text-gold">/</span> RSMS
            </p>
            <p className="leading-relaxed text-ink/75">
              {say(l, c.business.body)}
            </p>
            <Action href={`/${l}/about#business`}>
              {pick(
                l,
                "व्यावसायिक यात्रा का संदर्भ",
                "The business background",
              )}
            </Action>
          </div>
        </div>
      </section>
      <section className={`${wrap} py-20`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">
              {pick(
                l,
                "व्यक्ति और सार्वजनिक पहचान",
                "THE PERSON & PUBLIC IDENTITY",
              )}
            </p>
            <h2 className="display-title">
              {pick(l, "तस्वीरों में एक परिचय", "A visual introduction")}
            </h2>
          </div>
          <Action href={`/${l}/gallery`}>
            {pick(l, "गैलरी देखें", "View gallery")}
          </Action>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1.4fr_.6fr]">
          <Photo
            src="/images/portraits/seated.webp"
            alt={pick(
              l,
              "कक्ष में बैठे शिवेन्द्र कुमार शुक्ला",
              "Shiwendra Kumar Shukla seated indoors",
            )}
            className="h-[340px] sm:h-[460px]"
          />
          <div className="relative h-[340px] overflow-hidden bg-[#dfe3e7] sm:h-[460px]">
            <Image
              src="/images/gallery/public-2.webp"
              alt={name(l)}
              fill
              sizes="(max-width: 639px) 100vw, 35vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </section>
      <section className="bg-gold">
        <div className={`${wrap} grid gap-9 py-16 lg:grid-cols-[1fr_1fr]`}>
          <h2 className="font-display text-5xl leading-tight text-[#071e3c] sm:text-6xl">
            {pick(
              l,
              "आपकी बात से ही, संवाद आगे बढ़ता है।",
              "Public dialogue starts with you.",
            )}
          </h2>
          <div>
            <p className="text-lg leading-relaxed text-[#071e3c]">
              {say(l, c.participation.body)}
            </p>
            <Action href={`/${l}/contact`}>
              {pick(l, "अपनी बात साझा करें", "Share what matters")}
            </Action>
          </div>
        </div>
      </section>
    </>
  );
}
