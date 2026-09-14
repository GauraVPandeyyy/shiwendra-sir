"use client";

import { useEffect, useRef, useState, type WheelEvent } from "react";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  X as CloseIcon,
} from "lucide-react";

import { Locale, pick } from "@/content/site";

import { socialConfig } from "@/lib/social-config";
import { PlatformIcon } from "@/components/social-icons";

/* =========================================================
   TYPES
========================================================= */

type PlatformName = "Facebook" | "Instagram" | "X" | "YouTube";

/* =========================================================
   URL HELPERS
========================================================= */

function extractHandle(url: string) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    const first = parsed.pathname.split("/").filter(Boolean)[0];

    if (!first) return "";

    return first.startsWith("@") ? first : `@${first}`;
  } catch {
    return "";
  }
}

function facebookPostEmbedUrl(postUrl: string, width: number) {
  const params = new URLSearchParams({
    href: postUrl,
    show_text: "true",
    width: String(width),
  });

  return `https://www.facebook.com/plugins/post.php?${params.toString()}`;
}

function instagramPostEmbedUrl(postUrl: string) {
  try {
    const url = new URL(postUrl);

    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length >= 2 && ["p", "reel", "tv"].includes(parts[0])) {
      return `https://www.instagram.com/${parts[0]}/${parts[1]}/embed/captioned/`;
    }

    return "";
  } catch {
    return "";
  }
}

function getYouTubeId(url: string) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be" || parsed.hostname === "www.youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (parsed.pathname === "/watch") {
      return parsed.searchParams.get("v") ?? "";
    }

    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts[0] === "shorts" || parts[0] === "embed") {
      return parts[1] ?? "";
    }

    return "";
  } catch {
    return "";
  }
}

/* =========================================================
   DESKTOP SCROLL

   Important:
   - scrollbar invisible
   - normal scrolling inside card
   - once top/bottom reached, wheel is handed back to page
========================================================= */

const desktopFeedScroll = `
  lg:min-h-0
  lg:flex-1
  lg:overflow-y-auto
  lg:overscroll-y-auto

  lg:[scrollbar-width:none]
  lg:[-ms-overflow-style:none]
  lg:[&::-webkit-scrollbar]:hidden
`;

function releasePageScrollAtEdge(event: WheelEvent<HTMLDivElement>) {
  if (
    typeof window === "undefined" ||
    !window.matchMedia("(min-width: 1024px)").matches
  ) {
    return;
  }

  const element = event.currentTarget;

  const atTop = element.scrollTop <= 1;

  const atBottom =
    element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

  const goingUp = event.deltaY < 0;

  const goingDown = event.deltaY > 0;

  if ((atTop && goingUp) || (atBottom && goingDown)) {
    event.preventDefault();

    window.scrollBy({
      top: event.deltaY,
      behavior: "auto",
    });
  }
}

/* =========================================================
   CARD SHELL
========================================================= */

function SocialCard({ children }: { children: React.ReactNode }) {
  return (
    <article
      className="
        relative
        min-w-0

        overflow-hidden

        border
        border-navy/10

        bg-white

        shadow-[0_16px_46px_rgba(3,28,58,.07)]

        lg:flex
        lg:h-[700px]
        lg:flex-col
      "
    >
      {children}
    </article>
  );
}

/* =========================================================
   PLATFORM HEADER

   Not a fake profile card.
   Profile URL + handle only.
   Actual identity comes from platform embeds below.
========================================================= */

function PlatformBar({
  locale,
  platform,
  profileUrl,
}: {
  locale: Locale;
  platform: PlatformName;
  profileUrl: string;
}) {
  const handle = extractHandle(profileUrl);

  const background =
    platform === "Facebook"
      ? "bg-[#1877F2]"
      : platform === "Instagram"
        ? "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737]"
        : platform === "X"
          ? "bg-[#0f1419]"
          : "bg-[#FF0000]";

  return (
    <header
      className={`
        ${background}

        flex
        min-h-[58px]
        shrink-0

        items-center
        justify-between

        gap-3

        px-4

        text-white
      `}
    >
      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
        "
      >
        <PlatformIcon
          platform={platform}
          className="
            h-[18px]
            w-[18px]
            shrink-0
          "
        />

        <div className="min-w-0">
          <p
            className="
              ui-label
              text-[11px]
              font-bold
            "
          >
            {platform}
          </p>

          {handle ? (
            <p
              className="
                mt-0.5
                truncate
                text-[9px]
                font-medium
                text-white/70
              "
            >
              {handle}
            </p>
          ) : null}
        </div>
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        className="
          ui-label

          inline-flex
          min-h-9
          items-center

          gap-1.5

          rounded-full

          px-3

          text-[9px]
          font-bold

          transition-colors

          hover:bg-white/15
        "
      >
        {pick(locale, "प्रोफाइल", "PROFILE")}

        <ArrowUpRight size={13} />
      </a>
    </header>
  );
}

/* =========================================================
   MOBILE POST PAGER

   Mobile intentionally has NO nested vertical scroller.
========================================================= */

function MobilePager({
  locale,
  active,
  count,
  onChange,
}: {
  locale: Locale;
  active: number;
  count: number;
  onChange: (index: number) => void;
}) {
  if (count <= 1) {
    return null;
  }

  return (
    <div
      className="
        flex
        min-h-14

        items-center
        justify-between

        border-t
        border-navy/10

        bg-[#f6f5f1]

        px-3

        lg:hidden
      "
    >
      <button
        type="button"
        disabled={active === 0}
        onClick={() => onChange(active - 1)}
        aria-label={pick(locale, "पिछली पोस्ट", "Previous post")}
        className="
          grid
          h-10
          w-10
          place-items-center

          border
          border-navy/15

          text-navy

          transition-opacity

          disabled:opacity-25
        "
      >
        <ChevronLeft size={18} />
      </button>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <span
          className="
            ui-label

            text-[10px]
            font-bold
            tracking-[.14em]
            text-blue
          "
        >
          {String(active + 1).padStart(2, "0")}
          {" / "}
          {String(count).padStart(2, "0")}
        </span>

        <div className="flex gap-1.5">
          {Array.from({
            length: count,
          }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChange(index)}
              aria-label={`Post ${index + 1}`}
              className={`
                h-1.5
                transition-all
                duration-300

                ${active === index ? "w-7 bg-gold" : "w-1.5 bg-navy/20"}
              `}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={active === count - 1}
        onClick={() => onChange(active + 1)}
        aria-label={pick(locale, "अगली पोस्ट", "Next post")}
        className="
          grid
          h-10
          w-10
          place-items-center

          border
          border-navy/15

          text-navy

          transition-opacity

          disabled:opacity-25
        "
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

/* =========================================================
   DESKTOP POST CLICK OVERLAY

   Reason:
   Third-party iframe should not trap mouse-wheel.
   Desktop wheel hits this transparent layer -> outer feed scrolls.

   Clicking it opens real platform post.

   Mobile: hidden, so embedded post remains interactive.
========================================================= */

function DesktopPostOverlay({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="
        absolute
        inset-0
        z-20

        hidden

        cursor-pointer

        lg:block
      "
    >
      <span
        className="
          ui-label

          absolute
          bottom-3
          right-3

          translate-y-2

          border
          border-white/15

          bg-navy/90

          px-3
          py-2

          text-[9px]
          font-bold
          text-white

          opacity-0

          shadow-lg
          backdrop-blur

          transition-all
          duration-200

          group-hover/post:translate-y-0
          group-hover/post:opacity-100
        "
      >
        {label} ↗
      </span>
    </a>
  );
}

/* =========================================================
   FACEBOOK RESPONSIVE EMBED

   Facebook post plugin has a practical minimum width.
   We measure the real card and scale only when necessary.

   This fixes the current clipping.
========================================================= */

function FacebookPost({ postUrl, index }: { postUrl: string; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(380);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const update = () => {
      setContainerWidth(
        Math.max(1, Math.floor(element.getBoundingClientRect().width)),
      );
    };

    update();

    const observer = new ResizeObserver(update);

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /*
    Facebook post plugin:
    Keep its native width at least 350.

    If our 4-column card is narrower,
    scale whole official embed proportionally.
  */

  const nativeWidth = Math.min(500, Math.max(350, containerWidth));

  const scale = Math.min(1, containerWidth / nativeWidth);

  /*
    Generic height because future Facebook
    URLs can change from ENV.

    Current supplied posts are around
    700–770px.
  */
  const nativeHeight = 810;

  const visibleHeight = Math.ceil(nativeHeight * scale);

  return (
    <div
      ref={containerRef}
      className="
        group/post
        relative
        w-full
        overflow-hidden
        bg-white
      "
      style={{
        height: visibleHeight,
      }}
    >
      <iframe
        src={facebookPostEmbedUrl(postUrl, nativeWidth)}
        title={`Facebook post ${index + 1}`}
        width={nativeWidth}
        height={nativeHeight}
        scrolling="no"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="
          absolute
          left-0
          top-0

          border-0

          bg-white
        "
        style={{
          width: nativeWidth,
          height: nativeHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />

      <DesktopPostOverlay url={postUrl} label="Open Facebook post" />
    </div>
  );
}

/* =========================================================
   FACEBOOK CARD
========================================================= */

function FacebookCard({ locale }: { locale: Locale }) {
  const { profileUrl, posts } = socialConfig.facebook;

  const [active, setActive] = useState(0);

  return (
    <SocialCard>
      <PlatformBar
        locale={locale}
        platform="Facebook"
        profileUrl={profileUrl}
      />

      <div
        onWheel={releasePageScrollAtEdge}
        className={`
          ${desktopFeedScroll}

          bg-[#f2f3f5]
        `}
      >
        {posts.map((postUrl, index) => (
          <div
            key={postUrl}
            className={`
                ${index === active ? "block" : "hidden"}

                lg:block

                ${index > 0 ? "lg:border-t lg:border-navy/10" : ""}
              `}
          >
            <FacebookPost postUrl={postUrl} index={index} />
          </div>
        ))}
      </div>

      <MobilePager
        locale={locale}
        active={active}
        count={posts.length}
        onChange={setActive}
      />
    </SocialCard>
  );
}

/* =========================================================
   INSTAGRAM POST
========================================================= */

function InstagramPost({ postUrl, index }: { postUrl: string; index: number }) {
  const embedUrl = instagramPostEmbedUrl(postUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <div
      className="
        group/post
        relative
        overflow-hidden
        bg-white
      "
    >
      <iframe
        src={embedUrl}
        title={`Instagram post ${index + 1}`}
        loading="lazy"
        scrolling="no"
        allow="encrypted-media"
        className="
          block
          h-[830px]
          w-full

          border-0

          bg-white
        "
      />

      <DesktopPostOverlay url={postUrl} label="Open Instagram post" />
    </div>
  );
}

/* =========================================================
   INSTAGRAM CARD
========================================================= */

function InstagramCard({ locale }: { locale: Locale }) {
  const { profileUrl, posts } = socialConfig.instagram;

  const [active, setActive] = useState(0);

  return (
    <SocialCard>
      <PlatformBar
        locale={locale}
        platform="Instagram"
        profileUrl={profileUrl}
      />

      <div
        onWheel={releasePageScrollAtEdge}
        className={`
          ${desktopFeedScroll}

          bg-[#f5f5f5]
        `}
      >
        {posts.map((postUrl, index) => (
          <div
            key={postUrl}
            className={`
                ${index === active ? "block" : "hidden"}

                lg:block

                ${index > 0 ? "lg:border-t lg:border-navy/10" : ""}
              `}
          >
            <InstagramPost postUrl={postUrl} index={index} />
          </div>
        ))}
      </div>

      <MobilePager
        locale={locale}
        active={active}
        count={posts.length}
        onChange={setActive}
      />
    </SocialCard>
  );
}

/* =========================================================
   X WIDGET SCRIPT
========================================================= */

function useXWidgets() {
  useEffect(() => {
    const win = window as typeof window & {
      twttr?: {
        widgets?: {
          load?: (element?: HTMLElement) => void;
        };
      };
    };

    const load = () => {
      win.twttr?.widgets?.load?.();
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.x.com/widgets.js"]',
    );

    if (existing) {
      load();

      existing.addEventListener("load", load, {
        once: true,
      });

      return;
    }

    const script = document.createElement("script");

    script.src = "https://platform.x.com/widgets.js";

    script.async = true;

    script.charset = "utf-8";

    script.onload = load;

    document.body.appendChild(script);
  }, []);
}

/* =========================================================
   X POST
========================================================= */

function XPost({ postUrl }: { postUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const win = window as typeof window & {
      twttr?: {
        widgets?: {
          load?: (element?: HTMLElement) => void;
        };
      };
    };

    const timer = window.setTimeout(() => {
      if (containerRef.current) {
        win.twttr?.widgets?.load?.(containerRef.current);
      }
    }, 100);

    return () => window.clearTimeout(timer);
  }, [postUrl]);

  return (
    <div
      ref={containerRef}
      className="
        group/post
        relative

        min-h-[280px]

        overflow-hidden

        bg-white

        px-2
        py-1
      "
    >
      <blockquote
        className="twitter-tweet"
        data-theme="light"
        data-dnt="true"
        data-conversation="none"
      >
        <a href={postUrl}>View post on X</a>
      </blockquote>

      <DesktopPostOverlay url={postUrl} label="Open post on X" />
    </div>
  );
}

/* =========================================================
   X CARD
========================================================= */

function XCard({ locale }: { locale: Locale }) {
  useXWidgets();

  const { profileUrl, posts } = socialConfig.x;

  const [active, setActive] = useState(0);

  return (
    <SocialCard>
      <PlatformBar locale={locale} platform="X" profileUrl={profileUrl} />

      <div
        onWheel={releasePageScrollAtEdge}
        className={`
          ${desktopFeedScroll}

          bg-[#f5f5f5]
        `}
      >
        {posts.map((postUrl, index) => (
          <div
            key={postUrl}
            className={`
                ${index === active ? "block" : "hidden"}

                lg:block

                ${index > 0 ? "lg:border-t lg:border-navy/10" : ""}
              `}
          >
            <XPost postUrl={postUrl} />
          </div>
        ))}
      </div>

      <MobilePager
        locale={locale}
        active={active}
        count={posts.length}
        onChange={setActive}
      />
    </SocialCard>
  );
}

/* =========================================================
   YOUTUBE MODAL
========================================================= */

function YouTubeModal({
  videoId,
  onClose,
}: {
  videoId: string | null;

  onClose: () => void;
}) {
  useEffect(() => {
    if (!videoId) {
      return;
    }

    const previous = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previous;

      window.removeEventListener("keydown", handleKey);
    };
  }, [videoId, onClose]);

  if (!videoId) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="YouTube video"
      className="
        fixed
        inset-0
        z-[250]

        flex
        items-center
        justify-center

        bg-black/95

        p-3
        sm:p-8
      "
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="
          absolute
          inset-0
        "
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="
          absolute
          right-4
          top-4
          z-30

          grid
          h-12
          w-12
          place-items-center

          rounded-full

          bg-white
          text-black

          shadow-xl

          sm:right-7
          sm:top-7
        "
      >
        <CloseIcon size={23} />
      </button>

      <div
        className="
          relative
          z-20

          aspect-video
          w-full
          max-w-[1280px]

          overflow-hidden

          bg-black

          shadow-[0_30px_100px_rgba(0,0,0,.65)]
        "
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
            videoId,
          )}?autoplay=1&rel=0`}
          title="YouTube video player"
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="
            absolute
            inset-0

            h-full
            w-full

            border-0
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   YOUTUBE VIDEO PREVIEW
========================================================= */

function YouTubeVideo({
  locale,
  videoId,
  index,
  onPlay,
}: {
  locale: Locale;
  videoId: string;
  index: number;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="
        group

        block
        w-full

        overflow-hidden

        bg-white

        text-left
      "
    >
      <div
        className="
          relative
          aspect-video

          overflow-hidden

          bg-black
        "
      >
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="
            h-full
            w-full

            object-cover

            transition-transform
            duration-500

            group-hover:scale-[1.035]
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-black/10

            transition-colors

            group-hover:bg-black/25
          "
        />

        <span
          className="
            absolute
            left-1/2
            top-1/2

            grid
            h-14
            w-14

            -translate-x-1/2
            -translate-y-1/2

            place-items-center

            rounded-full

            bg-[#FF0000]
            text-white

            shadow-xl

            transition-transform

            group-hover:scale-110
          "
        >
          <Play size={23} fill="currentColor" className="translate-x-[1px]" />
        </span>
      </div>

      <div
        className="
          flex
          min-h-12

          items-center
          justify-between

          gap-3

          border-b
          border-black/[.06]

          px-4
        "
      >
        <span
          className="
            ui-label

            text-[9px]
            font-bold
            tracking-[.1em]
            text-navy
          "
        >
          {pick(
            locale,
            `वीडियो ${String(index + 1).padStart(2, "0")}`,
            `VIDEO ${String(index + 1).padStart(2, "0")}`,
          )}
        </span>

        <span
          className="
            ui-label

            text-[9px]
            font-bold
            text-[#FF0000]
          "
        >
          {pick(locale, "चलाएँ", "PLAY")}
        </span>
      </div>
    </button>
  );
}

/* =========================================================
   YOUTUBE CARD
========================================================= */

function YouTubeCard({
  locale,
  onPlay,
}: {
  locale: Locale;

  onPlay: (videoId: string) => void;
}) {
  const { profileUrl, videos } = socialConfig.youtube;

  const ids = videos.map(getYouTubeId).filter(Boolean);

  return (
    <SocialCard>
      <PlatformBar locale={locale} platform="YouTube" profileUrl={profileUrl} />

      <div
        className="
          flex
          flex-1
          flex-col

          bg-[#f4f4f4]
        "
      >
        <div>
          {ids.map((videoId, index) => (
            <YouTubeVideo
              key={videoId}
              locale={locale}
              videoId={videoId}
              index={index}
              onPlay={() => onPlay(videoId)}
            />
          ))}
        </div>

        <div
          className="
            mt-auto

            border-t
            border-navy/10

            bg-white

            p-5
          "
        >
          <p
            className="
              ui-label
              text-[9px]
              font-bold
              uppercase
              tracking-[.15em]
              text-[#FF0000]
            "
          >
            {pick(locale, "आधिकारिक यूट्यूब चैनल", "OFFICIAL YOUTUBE CHANNEL")}
          </p>

          <p
            className="
              mt-2
              font-display
              text-2xl
              text-navy
            "
          >
            {extractHandle(profileUrl)}
          </p>

          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="
              ui-label

              mt-4
              inline-flex
              min-h-10

              items-center
              gap-2

              border-b
              border-[#FF0000]

              text-[10px]
              font-bold
              text-navy
            "
          >
            {pick(locale, "पूरा चैनल देखें", "VISIT CHANNEL")}

            <ArrowUpRight size={14} className="text-[#FF0000]" />
          </a>
        </div>
      </div>
    </SocialCard>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function SocialMediaUpdate({ locale }: { locale: Locale }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section
        id="social"
        className="
          relative
          scroll-mt-24
          overflow-hidden

          bg-[#f0eee7]

          py-16

          lg:scroll-mt-28
          lg:py-24
        "
      >
        {/* subtle editorial background */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-16
            top-5

            font-display
            text-[18vw]
            leading-none
            text-navy/[.025]
          "
        >
          SOCIAL
        </div>

        <div
          className="
            relative

            mx-auto
            max-w-[1800px]

            px-4
            sm:px-6
            lg:px-5
            xl:px-8
          "
        >
          {/* =================================================
              SECTION HEADER
          ================================================== */}

          <div
            className="
              mb-8

              grid
              gap-6

              border-b
              border-navy/30

              pb-6

              lg:grid-cols-[1fr_auto]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  ui-label

                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[.18em]
                  text-blue
                "
              >
                {pick(locale, "सोशल मीडिया अपडेट", "SOCIAL MEDIA UPDATE")}
              </p>

              <h2
                className="
                  mt-2

                  max-w-3xl

                  font-display
                  text-4xl
                  leading-tight
                  text-navy

                  sm:text-5xl
                  lg:text-[3.5rem]
                "
              >
                {pick(
                  locale,
                  "सोशल मीडिया पर शिवेन्द्र",
                  "Shiwendra on Social Media",
                )}
              </h2>

              <p
                className="
                  mt-3
                  max-w-2xl

                  text-sm
                  leading-6
                  text-ink/55
                "
              >
                {pick(
                  locale,
                  "फेसबुक, इंस्टाग्राम, X और यूट्यूब पर आधिकारिक पोस्ट और वीडियो।",
                  "Official posts and videos across Facebook, Instagram, X and YouTube.",
                )}
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-1
              "
            >
              {[
                ["Facebook", socialConfig.facebook.profileUrl],
                ["Instagram", socialConfig.instagram.profileUrl],
                ["X", socialConfig.x.profileUrl],
                ["YouTube", socialConfig.youtube.profileUrl],
              ]
                .filter(([, url]) => Boolean(url))
                .map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={platform}
                    className="
                        grid
                        h-10
                        w-10
                        place-items-center

                        border
                        border-navy/10

                        text-navy

                        transition-all

                        hover:border-navy
                        hover:bg-navy
                        hover:text-white
                      "
                  >
                    <PlatformIcon
                      platform={platform}
                      className="h-[16px] w-[16px]"
                    />
                  </a>
                ))}
            </div>
          </div>

          {/* =================================================
              CARDS

              Mobile  = 1 column / normal page scroll
              Tablet  = 2 columns
              Desktop = 4 columns
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1

              items-start

              gap-5

              lg:grid-cols-3

              min-[1180px]:grid-cols-4
              min-[1180px]:gap-3

              xl:gap-4
            "
          >
            <FacebookCard locale={locale} />

            <InstagramCard locale={locale} />

            <XCard locale={locale} />

            {/* <YouTubeCard locale={locale} onPlay={setActiveVideo} /> */}
          </div>

          {/* Mobile usability hint */}
          <p
            className="
              ui-label

              mt-5

              text-center
              text-[9px]
              font-semibold
              tracking-[.1em]
              text-ink/40

              lg:hidden
            "
          >
            {pick(
              locale,
              "पोस्ट बदलने के लिए कार्ड के नीचे दिए गए तीरों का उपयोग करें",
              "Use the arrows below each card to move between posts",
            )}
          </p>
        </div>
      </section>

      <YouTubeModal
        videoId={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
