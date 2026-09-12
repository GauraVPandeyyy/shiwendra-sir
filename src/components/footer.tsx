import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Locale, name, nav, pick, candidate, say } from "@/content/site";
import { PlatformIcon, socialLinks } from "./social-icons";
import { BspMark } from "./bsp-mark";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="relative overflow-hidden bg-[#061a34] text-white">
      <div
        className="pointer-events-none absolute -bottom-20 right-0 opacity-[.04]"
        aria-hidden="true"
      >
        <BspMark
          locale={locale}
          decorative
          className="h-auto w-[360px] brightness-0 invert"
        />
      </div>
      <div className="mx-auto max-w-[1320px] px-5 pb-8 pt-16 sm:px-8 lg:px-16">
        <div className="relative grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="ui-label mb-4 text-xs font-bold uppercase tracking-[.18em] text-gold">
              BSP • HARCHANDPUR
            </p>
            <p className="max-w-md font-display text-4xl leading-snug">
              {name(locale)}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-[1.8] text-white/68">
              {say(locale, candidate)}
            </p>
          </div>

          <nav
            className="grid content-start gap-1"
            aria-label={pick(locale, "फुटर नेविगेशन", "Footer navigation")}
          >
            {nav[locale].map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="
      ui-label
      flex min-h-11
      items-center
      text-sm
      font-semibold
      text-white/78
      transition-colors
      hover:text-gold
    "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <Link
              className="group inline-flex min-h-12 items-center gap-4 border-b border-gold/75 font-display text-2xl"
              href={`/${locale}/contact`}
            >
              {pick(locale, "सीधा जनसंवाद", "Start a conversation")}
              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
            <div className="mt-7 flex flex-wrap gap-2">
              {socialLinks().map(([p, u]) => (
                <a
                  key={p}
                  href={u}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={p}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:bg-white/8 hover:text-gold"
                >
                  <PlatformIcon platform={p} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative grid gap-5 pt-7 text-xs leading-relaxed text-white/62 sm:grid-cols-[1fr_auto] sm:items-end">
          <p>
            © 2026 Shiwendra Kumar Shukla.
            <br />
            All Rights Reserved.
          </p>
          <a
            href="https://praibadvisors.com/"
            target="_blank"
            rel="noreferrer"
            className="group flex max-w-max items-center gap-4 rounded-full border border-white/14 bg-white/[.035] px-4 py-3 transition-colors hover:border-gold/70 hover:bg-white/[.07]"
          >
            <span>
              <span className="ui-label block text-[9px] font-bold uppercase tracking-[.18em] text-gold">
                Digital Experience Partner
              </span>
              <span className="mt-1 block text-sm font-semibold text-white">
                PRAIB Advisors LLP
              </span>
            </span>
            <ArrowUpRight
              size={17}
              className="text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
