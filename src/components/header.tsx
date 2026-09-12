"use client";

import { useEffect, useState, type FocusEvent, type MouseEvent } from "react";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

import { Locale, nav, pick, name, type NavItem } from "@/content/site";

import { PlatformIcon, socialLinks } from "./social-icons";

/* =========================================================
   HELPERS
========================================================= */

function buildNavHref(locale: Locale, href: string) {
  return `/${locale}${href}`;
}

function cleanPath(href: string) {
  return href.split("#")[0] || "/";
}

function isItemActive(pathname: string, locale: Locale, item: NavItem) {
  const itemPath = buildNavHref(locale, cleanPath(item.href));

  if (pathname === itemPath) {
    return true;
  }

  return itemPath !== `/${locale}` && pathname.startsWith(`${itemPath}/`);
}

/* =========================================================
   HEADER
========================================================= */

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const [compact, setCompact] = useState(false);

  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);

  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const toggle = document.getElementById(
      "mobile-nav-toggle",
    ) as HTMLInputElement | null;

    if (!toggle) return;

    let scrollY = 0;

    const handleToggle = () => {
      if (toggle.checked) {
        scrollY = window.scrollY;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
      } else {
        document.documentElement.style.overflow = "";

        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";

        window.scrollTo(0, scrollY);
      }
    };

    toggle.addEventListener("change", handleToggle);

    return () => {
      toggle.removeEventListener("change", handleToggle);

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, []);

  /* ---------------------------------------------------------
     TALL → COMPACT HEADER
  --------------------------------------------------------- */

  useEffect(() => {
    let queued = false;

    const onScroll = () => {
      if (queued) return;

      queued = true;

      requestAnimationFrame(() => {
        setCompact(window.scrollY > 48);

        queued = false;
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ---------------------------------------------------------
     CLOSE MENUS AFTER ROUTE CHANGE
  --------------------------------------------------------- */

  useEffect(() => {
    setOpenDesktopMenu(null);
    setOpenMobileSubmenu(null);

    const toggle = document.getElementById(
      "mobile-nav-toggle",
    ) as HTMLInputElement | null;

    if (toggle) {
      toggle.checked = false;
    }
  }, [pathname]);

  /* ---------------------------------------------------------
     ESCAPE CLOSES DROPDOWNS
  --------------------------------------------------------- */

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setOpenDesktopMenu(null);
      setOpenMobileSubmenu(null);

      const toggle = document.getElementById(
        "mobile-nav-toggle",
      ) as HTMLInputElement | null;

      if (toggle) {
        toggle.checked = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  /* ---------------------------------------------------------
     LANGUAGE ALTERNATE
  --------------------------------------------------------- */

  const alternate = pathname.replace(
    /^\/(hi|en)(?=\/|$)/,
    locale === "hi" ? "/en" : "/hi",
  );

  /* ---------------------------------------------------------
     MOBILE MENU CLOSE
  --------------------------------------------------------- */

  function closeMobileMenu() {
    setOpenMobileSubmenu(null);

    const toggle = document.getElementById(
      "mobile-nav-toggle",
    ) as HTMLInputElement | null;

    if (toggle) {
      toggle.checked = false;
    }
  }

  /* ---------------------------------------------------------
     MAIN NAVIGATION CLICK

     Important:
     If user is already on:
     /about#life-story

     and clicks:
     Shiwendra

     page should return to:
     /about
     + scroll to top.
  --------------------------------------------------------- */

  function handleMainNavigation(
    event: MouseEvent<HTMLAnchorElement> | undefined,
    href: string,
  ) {
    setOpenDesktopMenu(null);
    setOpenMobileSubmenu(null);

    const cleanHref = cleanPath(href);

    const targetPath = buildNavHref(locale, cleanHref);

    /*
      User is already on same page.

      Example:
      current:
      /en/about#life-story

      clicking:
      /en/about

      Force clean URL + top.
    */

    if (
      typeof window !== "undefined" &&
      window.location.pathname === targetPath
    ) {
      event?.preventDefault();

      window.history.pushState(null, "", targetPath);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* Keeps page content below fixed header */}
      <div
        className="
          h-[116px]
          lg:h-[132px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          NATIVE MOBILE MENU TOGGLE
      ====================================================== */}

      <input
        id="mobile-nav-toggle"
        type="checkbox"
        className="
          peer
          sr-only
          lg:hidden
        "
        aria-label={pick(locale, "मोबाइल मेन्यू", "Mobile menu")}
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-50

          bg-navy
          text-white
          shadow-sm

          transition-transform
          duration-300

          ${compact ? "-translate-y-9" : ""}
        `}
        data-compact={compact}
      >
        {/* ===================================================
            TOP POLITICAL BAR
        ==================================================== */}

        <div
          className={`
            mx-auto
            flex
            h-9
            max-w-[1440px]

            items-center
            justify-between

            gap-3

            border-b
            border-white/15

            px-4
            text-[11px]

            sm:px-8
            lg:px-16

            transition-opacity
            duration-200

            ${compact ? "pointer-events-none opacity-0" : ""}
          `}
          inert={compact}
        >
          <p
            className="
              ui-label
              truncate
              font-semibold
              tracking-[.04em]
            "
          >
            {pick(
              locale,
              "बसपा प्रभारी/प्रत्याशी • हरचंदपुर • रायबरेली",
              "BSP In-charge / Candidate • Harchandpur • Rae Bareli",
            )}
          </p>

          <div
            className="
              hidden
              shrink-0
              gap-1
              md:flex
            "
          >
            {socialLinks().map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={platform}
                className="
                    grid
                    h-8
                    w-8
                    place-items-center

                    transition-colors
                    hover:text-gold
                  "
              >
                <PlatformIcon
                  platform={platform}
                  className="
                      h-3.5
                      w-3.5
                    "
                />
              </a>
            ))}
          </div>
        </div>

        {/* ===================================================
            MAIN NAVBAR
        ==================================================== */}

        <div
          className="
            mx-auto
            flex
            h-20
            max-w-[1440px]

            items-center
            justify-between

            gap-4

            px-4
            sm:px-8

            lg:h-24
            lg:px-16
          "
        >
          {/* LOGO */}

          <Link
            href={`/${locale}`}
            onClick={() => {
              setOpenDesktopMenu(null);
              setOpenMobileSubmenu(null);
            }}
            aria-label={name(locale)}
            className="
              flex
              shrink-0
              items-center
            "
          >
            <Image
              src="/logof.png"
              alt={name(locale)}
              width={334}
              height={188}
              priority
              quality={100}
              sizes="
                (max-width:1024px)
                120px,
                155px
              "
              className="
                h-[80px]
                w-auto
                object-contain

                lg:h-[90px]
              "
            />
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================== */}

          <nav
            aria-label={pick(locale, "मुख्य नेविगेशन", "Main navigation")}
            className="
              hidden
              items-center
              gap-1
              lg:flex
            "
          >
            {nav[locale].map((item) => {
              const active = isItemActive(pathname, locale, item);

              const open = openDesktopMenu === item.href;

              return (
                <div
                  key={item.href}
                  className="
                      relative
                    "
                  onMouseEnter={() => setOpenDesktopMenu(item.href)}
                  onMouseLeave={() => setOpenDesktopMenu(null)}
                  onFocus={() => setOpenDesktopMenu(item.href)}
                  onBlur={(event: FocusEvent<HTMLDivElement>) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setOpenDesktopMenu(null);
                    }
                  }}
                >
                  {/* -----------------------------------------
                        MAIN PAGE LINK

                        Clicking text always navigates
                        to top-level page.
                    ----------------------------------------- */}

                  <Link
                    href={buildNavHref(locale, cleanPath(item.href))}
                    scroll
                    onClick={(event) => handleMainNavigation(event, item.href)}
                    aria-current={active ? "page" : undefined}
                    className={`
                        ui-label
                        relative

                        flex
                        min-h-12
                        items-center

                        gap-1.5
                        px-3

                        text-[13px]
                        font-semibold

                        transition-colors

                        ${active ? "text-gold" : "text-white hover:text-gold"}

                        ${
                          item.href === "/contact"
                            ? "ml-1 border-l border-white/15 pl-5"
                            : ""
                        }
                      `}
                  >
                    {item.label}

                    {item.children?.length ? (
                      <ChevronDown
                        size={14}
                        strokeWidth={2}
                        className={`
                            transition-transform
                            duration-200

                            ${open ? "rotate-180" : ""}
                          `}
                      />
                    ) : null}

                    {active && (
                      <span
                        className="
                            absolute
                            inset-x-3
                            bottom-0
                            h-px
                            bg-gold
                          "
                      />
                    )}
                  </Link>

                  {/* -----------------------------------------
                        DESKTOP DROPDOWN
                    ----------------------------------------- */}

                  {item.children?.length ? (
                    <div
                      className={`
                          absolute

                          left-1/2
                          top-full

                          z-[80]

                          w-[285px]

                          -translate-x-1/2

                          pt-2

                          transition-all
                          duration-200

                          ${
                            open
                              ? "visible translate-y-0 opacity-100"
                              : "pointer-events-none invisible translate-y-2 opacity-0"
                          }
                        `}
                    >
                      <div
                        className="
                            overflow-hidden

                            border
                            border-white/10

                            bg-[#071d39]/98

                            shadow-[0_24px_55px_rgba(0,0,0,.28)]

                            backdrop-blur-xl
                          "
                      >
                        {/* dropdown heading */}

                        <div
                          className="
                              border-b
                              border-white/10

                              px-5
                              py-3
                            "
                        >
                          <span
                            className="
                                ui-label
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[.15em]
                                text-gold
                              "
                          >
                            {item.label}
                          </span>
                        </div>

                        {/* dropdown links */}

                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={`${item.href}-${child.href}-${child.label}`}
                              href={buildNavHref(locale, child.href)}
                              onClick={() => {
                                setOpenDesktopMenu(null);
                              }}
                              className="
                                    group/sub

                                    flex
                                    min-h-12

                                    items-center
                                    justify-between

                                    gap-4

                                    border-b
                                    border-white/[.07]

                                    px-5
                                    py-3

                                    text-[13px]
                                    font-medium
                                    leading-snug
                                    text-white/78

                                    transition-colors

                                    last:border-b-0

                                    hover:bg-white/[.06]
                                    hover:text-white

                                    focus-visible:bg-white/[.06]
                                    focus-visible:text-white
                                  "
                            >
                              <span>{child.label}</span>

                              <ArrowUpRight
                                size={14}
                                className="
                                      shrink-0
                                      text-gold
                                      opacity-40

                                      transition-all

                                      group-hover/sub:-translate-y-0.5
                                      group-hover/sub:translate-x-0.5
                                      group-hover/sub:opacity-100
                                    "
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* =================================================
              RIGHT CONTROLS
          ================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
            "
          >
            <Link
              href={alternate}
              hrefLang={locale === "hi" ? "en" : "hi"}
              lang={locale === "hi" ? "en" : "hi"}
              aria-label={pick(locale, "Switch to English", "हिंदी में पढ़ें")}
              className="
                ui-label

                grid
                min-h-11
                min-w-11
                place-items-center

                px-2

                text-sm
                font-semibold

                transition-colors
                hover:text-gold
              "
            >
              {locale === "hi" ? "English" : "हिंदी"}
            </Link>

            {/* MOBILE MENU BUTTON */}

            <label
              htmlFor="mobile-nav-toggle"
              aria-label={pick(locale, "मेन्यू खोलें", "Open menu")}
              className="
                grid
                h-11
                w-11
                cursor-pointer
                place-items-center

                border
                border-white/30

                lg:hidden
              "
            >
              <Menu />
            </label>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      <div
        className="
    fixed
    inset-0
    z-[90]

    hidden
    h-[100dvh]
    min-h-[100dvh]
    w-screen

    overflow-hidden

    bg-[#071d39]

    peer-checked:flex

    lg:!hidden
  "
      >
        {/* Click backdrop to close */}

        <label
          htmlFor="mobile-nav-toggle"
          aria-label={pick(locale, "मेन्यू बंद करें", "Close menu")}
          className="
            absolute
            inset-0
            cursor-pointer
          "
        />

        {/* ===================================================
            MOBILE DRAWER
        ==================================================== */}

        <div
          className="
            relative
            ml-auto

            flex
    h-[100dvh]
    min-h-[100dvh]
    w-full
    max-w-[520px]

            flex-col

            overflow-y-auto
overscroll-contain
            bg-[#071d39]

            p-6

            text-white

            shadow-2xl

            sm:p-7
          "
        >
          {/* drawer header */}

          <div
            className="
              flex
              items-center
              justify-between

              border-b
              border-white/20

              pb-5
            "
          >
            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
              "
            >
              <Image
                src="/logof.png"
                alt={name(locale)}
                width={334}
                height={188}
                priority
                quality={100}
                sizes="
                (max-width:1024px)
                120px,
                155px
              "
                className="
                h-[80px]
                w-auto
                object-contain

                lg:h-[110px]
              "
              />

              {/* <div className="min-w-0">
                <span
                  className="
                    block
                    truncate
                    font-display
                    text-xl
                  "
                >
                  {name(locale)}
                </span>

                <span
                  className="
                    ui-label
                    mt-1
                    block

                    text-[11px]
                    font-semibold
                    text-gold
                  "
                >
                  {pick(locale, "बसपा • हरचंदपुर", "BSP • HARCHANDPUR")}
                </span>
              </div> */}
            </div>

            <label
              htmlFor="mobile-nav-toggle"
              aria-label={pick(locale, "मेन्यू बंद करें", "Close menu")}
              className="
                grid
                h-12
                w-12
                cursor-pointer
                place-items-center

                border
                border-white/20
              "
            >
              <X />
            </label>
          </div>

          {/* =================================================
              MOBILE NAVIGATION

              TEXT  = page navigation
              ARROW = submenu toggle
          ================================================== */}

          <nav
            className="my-6"
            aria-label={pick(locale, "मोबाइल नेविगेशन", "Mobile navigation")}
          >
            {nav[locale].map((item, index) => {
              const expanded = openMobileSubmenu === item.href;

              return (
                <div
                  key={item.href}
                  className="
                      border-b
                      border-white/15
                    "
                >
                  {/* parent row */}

                  <div
                    className="
                        flex
                        min-h-[64px]
                        items-stretch
                      "
                  >
                    {/* -------------------------------------
                          MAIN PAGE LINK
                      ------------------------------------- */}

                    <a
                      href={buildNavHref(locale, cleanPath(item.href))}
                      onClick={() => {
                        closeMobileMenu();
                      }}
                      className="
    flex
    min-w-0
    flex-1
    items-center
    gap-4
    py-4
    pr-3
  "
                    >
                      <span
                        className="
      ui-label
      shrink-0
      text-[10px]
      font-bold
      text-gold/75
    "
                      >
                        0{index + 1}
                      </span>

                      <span
                        className="
      font-display
      text-[1.65rem]
      leading-tight
    "
                      >
                        {item.label}
                      </span>
                    </a>

                    {/* -------------------------------------
                          ARROW ONLY OPENS SUBMENU
                      ------------------------------------- */}

                    {item.children?.length ? (
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMobileSubmenu(expanded ? null : item.href);
                        }}
                        aria-expanded={expanded}
                        aria-label={pick(
                          locale,
                          `${item.label} उप-मेन्यू खोलें`,
                          `Open ${item.label} submenu`,
                        )}
                        className="
                            grid
                            w-14
                            shrink-0
                            place-items-center

                            border-l
                            border-white/10

                            text-white/70

                            transition-colors

                            hover:bg-white/[.05]
                            hover:text-gold
                          "
                      >
                        <ChevronDown
                          size={20}
                          className={`
                              transition-transform
                              duration-200

                              ${expanded ? "rotate-180" : ""}
                            `}
                        />
                      </button>
                    ) : null}
                  </div>

                  {/* ---------------------------------------
                        MOBILE SUB NAV
                    --------------------------------------- */}

                  {item.children?.length ? (
                    <div
                      className={`
                          overflow-hidden

                          bg-white/[.035]

                          transition-[max-height,opacity]
                          duration-300

                          ${
                            expanded
                              ? "max-h-[420px] opacity-100"
                              : "max-h-0 opacity-0"
                          }
                        `}
                    >
                      <div
                        className="
                            border-t
                            border-white/[.07]

                            pb-2
                            pl-12
                          "
                      >
                        {item.children.map((child) => (
                          <Link
                            key={`${item.href}-${child.href}-${child.label}`}
                            href={buildNavHref(locale, child.href)}
                            onClick={() => {
                              setOpenMobileSubmenu(null);

                              closeMobileMenu();
                            }}
                            className="
                                  flex
                                  min-h-12

                                  items-center
                                  justify-between

                                  gap-4

                                  border-b
                                  border-white/[.07]

                                  py-3
                                  pr-3

                                  text-[14px]
                                  font-medium
                                  leading-snug
                                  text-white/76

                                  transition-colors

                                  last:border-b-0

                                  hover:text-white
                                "
                          >
                            <span>{child.label}</span>

                            <ArrowUpRight
                              size={14}
                              className="
                                    shrink-0
                                    text-gold
                                  "
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* =================================================
              DRAWER FOOTER
          ================================================== */}

          <div
            className="
              mt-auto

              grid
              gap-5

              border-t
              border-white/15

              pt-6
            "
          >
            <Link
              href={alternate}
              onClick={closeMobileMenu}
              className="
                ui-label

                inline-flex
                min-h-12

                items-center
                justify-between

                border-b
                border-gold

                font-semibold
              "
            >
              {locale === "hi" ? "Read in English" : "हिंदी में पढ़ें"}

              <ArrowUpRight size={17} />
            </Link>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {socialLinks().map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={platform}
                  className="
                      grid
                      h-11
                      w-11
                      place-items-center

                      border
                      border-white/20
                    "
                >
                  <PlatformIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   FLOATING SOCIAL ACTIONS
========================================================= */

export function FloatingActions({ locale }: { locale: Locale }) {
  return (
    <aside
      aria-label={pick(
        locale,
        "आधिकारिक सोशल प्रोफाइल",
        "Official social profiles",
      )}
      className="
        social-dock
        pointer-events-none

        fixed
        right-0
        top-1/2

        z-40

        -translate-y-1/2
      "
    >
      <div
        className="
          pointer-events-auto

          flex
          flex-col

          overflow-hidden

          border
          border-white/20

          bg-navy/92

          py-1

          text-white

          shadow-[0_16px_38px_rgba(3,20,43,.28)]

          backdrop-blur-md
        "
      >
        {socialLinks().map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={platform}
            className="
                group
                relative

                grid
                h-10
                w-9

                place-items-center

                sm:h-12
                sm:w-11
              "
          >
            <PlatformIcon
              platform={platform}
              className="
                  h-4
                  w-4

                  sm:h-5
                  sm:w-5
                "
            />

            <span
              className="
                  pointer-events-none

                  absolute
                  right-full

                  mr-2

                  hidden

                  translate-x-2

                  whitespace-nowrap

                  bg-navy

                  px-3
                  py-2

                  text-xs

                  opacity-0

                  shadow-lg

                  transition-all

                  group-hover:translate-x-0
                  group-hover:opacity-100

                  group-focus-visible:translate-x-0
                  group-focus-visible:opacity-100

                  xl:block
                "
            >
              {platform}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}
