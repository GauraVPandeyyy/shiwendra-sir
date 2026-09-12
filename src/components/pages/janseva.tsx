import Image from "next/image";
import { Locale, pick, say } from "@/content/site";
import { serviceStory as s } from "@/content/service";
import { Paragraphs, ThemeImage } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { Action, wrap } from "@/components/ui";
import {
  HeartPulse,
  HandHeart,
  Sprout,
  MessagesSquare,
  ArrowDown,
} from "lucide-react";
export function JansevaPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#e2e8e7]">
        <div className={`${wrap} grid gap-8 py-14 lg:grid-cols-2 lg:py-20`}>
          <div className="self-center">
            <p className="eyebrow">
              {pick(
                l,
                "जनसेवा • संवेदना और सहयोग",
                "PUBLIC SERVICE • COMPASSION & SUPPORT",
              )}
            </p>
            <h1 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[1.2] text-navy">
              {pick(
                l,
                "जरूरत को समझें, सम्मान के साथ सहयोग करें",
                "Closer to need. Rooted in dignity.",
              )}
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/75">
              {pick(
                l,
                "किसी की बात सुनना, उसकी परिस्थिति समझना और फिर उपयोगी सहयोग की दिशा तलाशना—जनसेवा का मानवीय अर्थ यहीं से शुरू होता है।",
                "Understand the circumstances. Hear the person. Consider a useful way forward. This is where the human meaning of service begins.",
              )}
            </p>
            <a
              href="#service-philosophy"
              aria-label={pick(
                l,
                "सेवा की दृष्टि पढ़ें",
                "Read the service philosophy",
              )}
              className="mt-8 grid h-14 w-14 place-items-center rounded-full border border-navy/40"
            >
              <ArrowDown />
            </a>
          </div>
          <div className="grid grid-cols-2 items-center gap-3">
            <ThemeImage
              locale={l}
              theme="healthcare"
              className="col-span-2 h-[310px] lg:h-[360px]"
            />
            <ThemeImage locale={l} theme="education" className="h-44" />
            <ThemeImage locale={l} theme="families" className="h-44" />
          </div>
        </div>
      </section>
      <section id="service-philosophy" className={`${wrap} py-20`}>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <HandHeart className="mb-7 text-blue" size={42} strokeWidth={1.2} />
            <h2 className="display-title">{say(l, s[0].title)}</h2>
          </div>
          <Paragraphs
            locale={l}
            items={s[0].paragraphs}
            className="text-ink/80"
          />
        </div>
      </section>
      <section
        id="healthcare"
        className="-scroll-mt-16 bg-[#092b46] text-white"
      >
        <div className={`${wrap} py-20`}>
          <p className="eyebrow !text-gold">
            01 / {pick(l, "स्वास्थ्य सहायता", "ACCESS TO CARE")}
          </p>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="display-title !text-white">
                {say(l, s[1].title)}
              </h2>
              <Reveal className="mt-9">
                <ThemeImage locale={l} theme="health" className="h-[420px]" />
              </Reveal>
              <p className="mt-5 flex items-center gap-3 font-display text-2xl">
                <HeartPulse className="shrink-0 text-gold" />
                {say(l, s[1].lead!)}
              </p>
            </div>
            <Paragraphs
              locale={l}
              items={s[1].paragraphs}
              className="text-white/80"
            />
          </div>
        </div>
      </section>
      <section id="education" className={`${wrap} -scroll-mt-16 py-20`}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">02 / {pick(l, "शिक्षा", "EDUCATION")}</p>
            <h2 className="display-title">{say(l, s[2].title)}</h2>
            <Paragraphs
              locale={l}
              items={s[2].paragraphs}
              className="mt-7 text-ink/80"
            />
          </div>
          <Reveal kind="depth">
            <ThemeImage
              locale={l}
              theme="education-janseva"
              className="h-[510px]"
            />
          </Reveal>
        </div>
      </section>
      <section className="bg-[#e9e1d5]">
        <div className={`${wrap} py-20`}>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <ThemeImage locale={l} theme="families" className="h-[440px]" />
            <div className="self-center">
              <p className="eyebrow">
                03 / {pick(l, "परिवार और बालिकाएँ", "FAMILIES & GIRLS")}
              </p>
              <h2 className="display-title">{say(l, s[3].title)}</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {s[3].paragraphs.map((p, i) => (
              <div key={i} className="border-t border-navy/20 pt-6">
                <span className="ui-label mb-3 block text-xs font-bold tracking-[.12em] text-blue">
                  0{i + 1}
                </span>
                <p className="text-lg leading-[1.95] text-ink/80">
                  {say(l, p)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`${wrap} py-20`}>
        <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
          <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-blue p-8 text-white">
            <span
              className="font-display text-5xl opacity-25"
              aria-hidden="true"
            >
              COVID
            </span>
            <HandHeart size={70} strokeWidth={0.8} />
            <p className="mt-8 font-display text-3xl">
              {pick(
                l,
                "कठिन समय में मदद की असली परीक्षा होती है",
                "Human support through difficult times.",
              )}
            </p>
          </div>
          <div>
            <p className="eyebrow">
              04 / {pick(l, "राहत और आपात सहयोग", "RELIEF & EMERGENCY SUPPORT")}
            </p>
            <h2 className="display-title">{say(l, s[4].title)}</h2>
            <Paragraphs
              locale={l}
              items={s[4].paragraphs}
              className="mt-7 text-ink/80"
            />
          </div>
        </div>
      </section>
      <section className="bg-[#dae2d7]">
        <div
          className={`${wrap} grid gap-10 py-16 lg:grid-cols-[auto_.8fr_1.2fr]`}
        >
          <Sprout size={90} strokeWidth={0.8} className="text-[#305641]" />
          <div>
            <p className="eyebrow">
              05 / {pick(l, "ग्रामीण सरोकार", "RURAL CONCERNS")}
            </p>
            <h2 className="font-display text-4xl leading-snug text-navy">
              {say(l, s[5].title)}
            </h2>
          </div>
          <Paragraphs
            locale={l}
            items={s[5].paragraphs}
            className="text-ink/80"
          />
        </div>
      </section>
      <section className={`${wrap} py-20`}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <ThemeImage locale={l} theme="youth" className="h-[470px]" />
          </Reveal>
          <div>
            <p className="eyebrow">06 / {pick(l, "युवा", "YOUNG PEOPLE")}</p>
            <h2 className="display-title">{say(l, s[6].title)}</h2>
            <Paragraphs
              locale={l}
              items={s[6].paragraphs}
              className="mt-7 text-ink/80"
            />
          </div>
        </div>
      </section>
      <section
        id="community-support"
        className="-scroll-mt-16 border-y border-navy/20"
      >
        <div className={`${wrap} grid gap-10 py-16 lg:grid-cols-2`}>
          <div>
            <MessagesSquare size={40} className="mb-6 text-blue" />
            <p className="eyebrow">07 / {pick(l, "समुदाय", "COMMUNITY")}</p>
            <h2 className="display-title">{say(l, s[7].title)}</h2>
          </div>
          <Paragraphs
            locale={l}
            items={s[7].paragraphs}
            className="text-ink/80"
          />
        </div>
      </section>
      <section className={`${wrap} py-20`}>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">
              08 / {pick(l, "भविष्य की दिशा", "FUTURE DIRECTION")}
            </p>
            <h2 className="display-title">{say(l, s[8].title)}</h2>
          </div>
          <div>
            <Paragraphs
              locale={l}
              items={s[8].paragraphs}
              className="text-ink/80"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                pick(l, "बुजुर्गों का सहयोग", "Older people"),
                pick(l, "समावेशी सहायता", "Inclusive support"),
                pick(l, "स्वास्थ्य जागरूकता", "Health awareness"),
              ].map((t) => (
                <span
                  key={t}
                  className="border border-navy/20 px-4 py-3 text-sm text-blue"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-15">
          <Image
            src="/images/social-service/farm3.png"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className={`${wrap} relative py-16`}>
          <p className="eyebrow !text-gold">
            {pick(
              l,
              "सहायता की बात, सम्मान के साथ",
              "A RESPECTFUL SPACE TO REACH OUT",
            )}
          </p>
          <h2 className="max-w-2xl font-display text-4xl leading-snug sm:text-5xl">
            {pick(
              l,
              "अपनी बात साझा करें—जरूरत को समझना ही सहयोग की पहली शुरुआत है",
              "Share your circumstances. Let’s understand the need.",
            )}
          </h2>
          <Action light href={`/${l}/contact?topic=healthcare`}>
            {pick(l, "जनसंवाद में लिखें", "Write through Jan Samvad")}
          </Action>
        </div>
      </section>
    </>
  );
}
