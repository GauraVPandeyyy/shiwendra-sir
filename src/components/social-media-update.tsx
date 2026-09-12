import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";

import { name, pick, type Locale } from "@/content/site";

import { socialWall, type SocialHighlight } from "@/content/social";

import { PlatformIcon } from "@/components/social-icons";

type PlatformName = "Facebook" | "YouTube" | "Instagram" | "X";

const platformTheme: Record<
  PlatformName,
  {
    header: string;
    surface: string;
    border: string;
    accent: string;
  }
> = {
  Facebook: {
    header: "bg-[#4267B2]",
    surface: "bg-[#f8faff]",
    border: "border-[#c9d6eb]",
    accent: "text-[#315ca8]",
  },

  YouTube: {
    header: "bg-[#e00000]",
    surface: "bg-[#fffafa]",
    border: "border-[#ecd0d0]",
    accent: "text-[#cf0000]",
  },

  Instagram: {
    header: "bg-[#6b4aa5]",
    surface: "bg-[#fcfaff]",
    border: "border-[#ded3ea]",
    accent: "text-[#65419b]",
  },

  X: {
    header: "bg-[#101820]",
    surface: "bg-[#fafafa]",
    border: "border-[#cfd3d6]",
    accent: "text-[#101820]",
  },
};

function profileButtonText(locale: Locale, platform: PlatformName) {
  switch (platform) {
    case "Facebook":
      return pick(locale, "Facebook पर देखें", "Visit Facebook");

    case "Instagram":
      return pick(locale, "Instagram खोलें", "Open Instagram");

    case "YouTube":
      return pick(locale, "YouTube चैनल देखें", "Visit YouTube channel");

    case "X":
      return pick(locale, "X पर देखें", "Open X");
  }
}

function PlatformHeader({
  platform,
  profileUrl,
}: {
  platform: PlatformName;
  profileUrl: string;
}) {
  const theme = platformTheme[platform];

  return (
    <div
      className={[
        "flex h-12 shrink-0 items-center justify-between",
        "px-4 text-white sm:px-5",
        theme.header,
      ].join(" ")}
    >
      <div className="flex items-center gap-2.5">
        <PlatformIcon platform={platform} className="h-[17px] w-[17px]" />

        <span className="ui-label text-[13px] font-bold">{platform}</span>
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${platform}`}
        className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/10"
      >
        <ArrowUpRight size={17} />
      </a>
    </div>
  );
}

function ProfileSummary({
  locale,
  platform,
  handle,
  description,
  profileUrl,
}: {
  locale: Locale;
  platform: PlatformName;
  handle: string;
  description: readonly [string, string];
  profileUrl: string;
}) {
  const theme = platformTheme[platform];

  return (
    <div className="relative overflow-hidden border-b border-black/[0.07] bg-white p-5 sm:p-6">
      {/* Subtle platform watermark */}
      <div className="pointer-events-none absolute -right-7 -top-7 opacity-[0.035]">
        <PlatformIcon platform={platform} className="h-40 w-40" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#edf1f5] shadow-[0_5px_20px_rgba(3,30,65,.12)]">
          <Image
            src={socialWall.profileImage}
            alt={name(locale)}
            fill
            sizes="68px"
            className="object-cover object-top"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={[
              "ui-label text-[9px] font-bold uppercase",
              "tracking-[.15em]",
              theme.accent,
            ].join(" ")}
          >
            {pick(locale, `आधिकारिक ${platform}`, `OFFICIAL ${platform}`)}
          </p>

          <h3 className="mt-1.5 font-display text-[24px] leading-tight text-navy sm:text-[28px]">
            {name(locale)}
          </h3>

          <p className="mt-1 text-[12px] font-semibold text-ink/55">{handle}</p>
        </div>
      </div>

      <p className="relative mt-5 max-w-xl text-[14px] leading-6 text-ink/70">
        {pick(locale, description[0], description[1])}
      </p>

      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        className={[
          "ui-label relative mt-5 inline-flex",
          "min-h-10 items-center gap-2",
          "border-b font-bold",
          "text-[12px]",
          theme.accent,
        ].join(" ")}
      >
        {profileButtonText(locale, platform)}

        <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

function HighlightCard({
  item,
  locale,
  platform,
}: {
  item: SocialHighlight;
  locale: Locale;
  platform: PlatformName;
}) {
  const theme = platformTheme[platform];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(4,32,67,.10)]"
    >
      {item.image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-[#e8ebee]">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {item.title ? (
              <h4 className="font-display text-[19px] leading-snug text-navy">
                {pick(locale, item.title[0], item.title[1])}
              </h4>
            ) : null}

            <p
              className={[
                item.title ? "mt-2" : "",
                "text-[13px] leading-[1.65] text-ink/70",
              ].join(" ")}
            >
              {pick(locale, item.text[0], item.text[1])}
            </p>
          </div>

          <ArrowUpRight
            size={17}
            className={["mt-0.5 shrink-0", theme.accent].join(" ")}
          />
        </div>

        {item.date ? (
          <p className="ui-label mt-3 text-[10px] font-semibold uppercase tracking-[.08em] text-ink/40">
            {pick(locale, item.date[0], item.date[1])}
          </p>
        ) : null}
      </div>
    </a>
  );
}

function SelectedUpdates({
  locale,
  platform,
  items,
}: {
  locale: Locale;
  platform: PlatformName;
  items: SocialHighlight[];
}) {
  if (!items.length) {
    return (
      <div className="flex min-h-[170px] items-center justify-center px-7 text-center">
        <div className="max-w-sm">
          <PlatformIcon
            platform={platform}
            className="mx-auto h-8 w-8 text-navy/20"
          />

          <p className="mt-4 text-[13px] leading-6 text-ink/50">
            {pick(
              locale,
              "इस प्रोफाइल के चुने हुए महत्वपूर्ण अपडेट यहाँ प्रदर्शित किए जा सकते हैं।",
              "Selected important updates from this profile can be highlighted here.",
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="ui-label text-[10px] font-bold uppercase tracking-[.16em] text-navy/55">
          {pick(locale, "चयनित अपडेट", "SELECTED UPDATES")}
        </p>

        <span className="ui-label text-[9px] font-semibold uppercase tracking-[.12em] text-ink/35">
          {pick(locale, "स्क्रॉल करें", "SCROLL")}
        </span>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <HighlightCard
            key={item.id}
            item={item}
            locale={locale}
            platform={platform}
          />
        ))}
      </div>
    </div>
  );
}

function SocialProfilePanel({
  locale,
  platform,
  profileUrl,
  handle,
  description,
  highlights,
}: {
  locale: Locale;
  platform: PlatformName;
  profileUrl: string;
  handle: string;
  description: readonly [string, string];
  highlights: SocialHighlight[];
}) {
  const theme = platformTheme[platform];

  return (
    <article
      className={[
        "flex h-[520px] flex-col overflow-hidden",
        "border shadow-[0_14px_42px_rgba(6,47,99,.08)]",
        "sm:h-[550px]",
        theme.border,
        theme.surface,
      ].join(" ")}
    >
      <PlatformHeader platform={platform} profileUrl={profileUrl} />

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <ProfileSummary
          locale={locale}
          platform={platform}
          handle={handle}
          description={description}
          profileUrl={profileUrl}
        />

        <SelectedUpdates
          locale={locale}
          platform={platform}
          items={highlights}
        />
      </div>
    </article>
  );
}

function YouTubePanel({ locale }: { locale: Locale }) {
  const youtube = socialWall.youtube;
  const videoId = youtube.featuredVideoId.trim();

  return (
    <article className="flex h-[520px] flex-col overflow-hidden border border-[#ecd0d0] bg-[#fffafa] shadow-[0_14px_42px_rgba(6,47,99,.08)] sm:h-[550px]">
      <PlatformHeader platform="YouTube" profileUrl={youtube.profileUrl} />

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {videoId ? (
          <>
            <div className="relative aspect-video bg-black">
              <iframe
                title={`${name(locale)} YouTube video`}
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                  videoId,
                )}?rel=0`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <div className="border-b border-black/[0.07] bg-white p-5 sm:p-6">
              <p className="ui-label text-[9px] font-bold uppercase tracking-[.16em] text-[#cf0000]">
                {pick(locale, "चयनित वीडियो", "FEATURED VIDEO")}
              </p>

              <h3 className="mt-2 font-display text-2xl leading-tight text-navy">
                {name(locale)}
              </h3>

              <p className="mt-1 text-[12px] font-semibold text-ink/50">
                {youtube.handle}
              </p>

              <a
                href={youtube.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="ui-label mt-5 inline-flex min-h-10 items-center gap-2 border-b border-[#cf0000] text-[12px] font-bold text-[#cf0000]"
              >
                {pick(locale, "YouTube चैनल देखें", "Visit YouTube channel")}

                <ArrowUpRight size={15} />
              </a>
            </div>
          </>
        ) : (
          <YouTubeFallback locale={locale} />
        )}
      </div>
    </article>
  );
}

function YouTubeFallback({ locale }: { locale: Locale }) {
  const youtube = socialWall.youtube;

  return (
    <div className="relative flex min-h-full flex-col justify-between overflow-hidden bg-navy p-6 text-white sm:p-8">
      <div
        className="pointer-events-none absolute -right-16 top-8 grid h-64 w-64 place-items-center rounded-full border border-white/10"
        aria-hidden="true"
      >
        <PlatformIcon platform="YouTube" className="h-24 w-24 text-white/10" />
      </div>

      <div className="relative">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#e00000] shadow-lg">
          <Play size={24} fill="currentColor" />
        </div>

        <p className="ui-label mt-12 text-[10px] font-bold uppercase tracking-[.18em] text-gold">
          {pick(locale, "आधिकारिक YouTube चैनल", "OFFICIAL YOUTUBE CHANNEL")}
        </p>

        <h3 className="mt-3 max-w-lg font-display text-4xl leading-[1.05] sm:text-5xl">
          {name(locale)}
        </h3>

        <p className="mt-3 text-sm font-semibold text-white/60">
          {youtube.handle}
        </p>

        <p className="mt-6 max-w-lg text-[14px] leading-7 text-white/70">
          {pick(locale, youtube.description[0], youtube.description[1])}
        </p>
      </div>

      <a
        href={youtube.profileUrl}
        target="_blank"
        rel="noreferrer"
        className="ui-label relative mt-10 inline-flex w-max min-h-11 items-center gap-2 border-b border-gold text-[12px] font-bold"
      >
        {pick(locale, "YouTube पर देखें", "Open YouTube")}

        <ArrowUpRight size={16} />
      </a>
    </div>
  );
}

export function SocialMediaUpdate({ locale }: { locale: Locale }) {
  return (
    <section id="social" className="bg-[#f0eee7] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        {/* SECTION HEADING */}
        <div className="mb-7 border-b-2 border-navy pb-5">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="ui-label text-[10px] font-bold uppercase tracking-[.18em] text-blue">
                {pick(locale, "सोशल मीडिया अपडेट", "SOCIAL MEDIA UPDATE")}
              </p>

              <h2 className="mt-2 font-display text-4xl leading-tight text-navy sm:text-5xl">
                {pick(locale, "आधिकारिक सोशल मीडिया", "Official social media")}
              </h2>
            </div>

            {/* ALL PROFILE LINKS */}
            <div className="flex flex-wrap items-center gap-1">
              {[
                socialWall.facebook,
                socialWall.youtube,
                socialWall.instagram,
                socialWall.x,
              ].map((social) => (
                <a
                  key={social.platform}
                  href={social.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.platform}
                  title={social.platform}
                  className="grid h-10 w-10 place-items-center text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  <PlatformIcon
                    platform={social.platform}
                    className="h-[17px] w-[17px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SOCIAL WALL */}
        <div className="grid gap-5 lg:grid-cols-4">
          <SocialProfilePanel
            locale={locale}
            platform="Facebook"
            profileUrl={socialWall.facebook.profileUrl}
            handle={socialWall.facebook.handle}
            description={socialWall.facebook.description}
            highlights={socialWall.facebook.highlights}
          />

          <YouTubePanel locale={locale} />

          <SocialProfilePanel
            locale={locale}
            platform="Instagram"
            profileUrl={socialWall.instagram.profileUrl}
            handle={socialWall.instagram.handle}
            description={socialWall.instagram.description}
            highlights={socialWall.instagram.highlights}
          />

          <SocialProfilePanel
            locale={locale}
            platform="X"
            profileUrl={socialWall.x.profileUrl}
            handle={socialWall.x.handle}
            description={socialWall.x.description}
            highlights={socialWall.x.highlights}
          />
        </div>
      </div>
    </section>
  );
}
