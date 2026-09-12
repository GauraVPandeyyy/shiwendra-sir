# Engineering handoff

## Architecture and dependencies

Native Next.js App Router with TypeScript strict mode, React, Tailwind CSS, Motion, Lucide, Nodemailer and Zod. The lockfile is the dependency authority. Page components default to server rendering. Client boundaries are the header/dock, hero, lightweight reveal observer, contact form and gallery; the lightbox is dynamically loaded. No CMS, login, admin or submission database.

Directory map:

- `src/app/[locale]`: twelve statically generated localized pages and localized layout.
- `src/app/api/contact/route.ts`: server-only email handler.
- `src/components/pages`: six independent page compositions.
- `src/components`: shared global/primitives and interactive client components.
- `src/content`: bilingual facts, page-specific editorial text, media and curated social data.
- `src/lib/seo.ts`: metadata, canonical, language alternatives and structured data.
- `src/lib/contact.ts`: shared validation and safe email HTML.
- `src/server`: rate-limit and authorized social-adapter integration.
- `public/images`: local optimized imagery. V3.1 ships no local font binaries; active typography is loaded as webfonts from the locale layout.
- `tests`: carousel and security/endpoint checks; `scripts/audit-build.mjs`: twelve-page production audit.

## Environment

Copy `.env.example` to `.env.local`; never commit credentials.

| Variable | Purpose |
| --- | --- |
| NEXT_PUBLIC_SITE_URL | Official HTTPS origin, without a trailing slash; set before building metadata/sitemap |
| CONTACT_ALLOWED_ORIGINS | Exact comma-separated origins allowed to submit forms |
| SMTP_HOST / SMTP_PORT | SMTP endpoint; typical STARTTLS port 587 |
| SMTP_SECURE | true for implicit TLS, otherwise STARTTLS is required |
| SMTP_USER / SMTP_PASSWORD | Server-only mail credentials |
| MAIL_FROM | Verified sender accepted by the SMTP provider |
| CONTACT_RECIPIENT | Actual team mailbox receiving submissions |
| CONTACT_TRUSTED_IP_HEADER | Header overwritten by your trusted hosting proxy; never trust arbitrary incoming headers |
| RATE_LIMIT_REST_URL / RATE_LIMIT_REST_TOKEN | Optional Upstash-compatible shared rate counters; no message content stored |
| SOCIAL_FEED_URL / SOCIAL_FEED_TOKEN | Server-only authorized normalized-feed adapter URL/token |
| NEXT_PUBLIC_INSTAGRAM_URL / NEXT_PUBLIC_YOUTUBE_URL | Official Instagram and YouTube profile overrides; V3.1 includes confirmed defaults |
| NEXT_PUBLIC_PHONE / NEXT_PUBLIC_PUBLIC_EMAIL | Optional public contact details; hidden while empty |
| NEXT_PUBLIC_WHATSAPP | Reserved configuration only; no unconfirmed WhatsApp CTA is published |
| NEXT_TELEMETRY_DISABLED | 1 disables Next.js telemetry |

Only the public domain and public profile/contact values belong in NEXT_PUBLIC variables. Rebuild when those values change. Keep SMTP and API tokens server-only. The current localhost domain is a development fallback, not a deployable canonical identity.

## Email workflow

The five user fields are Name, Mobile, Village/Area (optional, retained from working V2), Category and Message. Categories remain concern, suggestion, meeting, support and other. Visual topics map onto these categories. The topic selector is a navigation/category aid; the citizen describes the actual subject in the Message field.

Client and server validate the submission using Zod. The endpoint checks origin, JSON content type, a streaming 20 KB request limit, field length, mobile format, honeypot, minimum completion time and request rate. Input is escaped before generating email HTML. Credentials and provider errors are not exposed. A positive result requires SMTP acceptance with no rejected recipient; this is acceptance by the email service, not proof of inbox delivery or staff reading. Unconfigured SMTP returns 503 and the UI states that the message was not sent. Network ambiguity is described honestly.

Default abuse protection is a bounded in-memory counter: five submissions per 15 minutes. Without a configured trusted IP header, all requests share a conservative fallback bucket. For production, configure a trustworthy proxy header and shared rate counters if using multiple instances. The optional counter store contains rate data only, not submissions. Configure proxy request timeouts/body limits as part of deployment.

The mailbox/provider processes and retains email even though the website has no submission database. The team must set and follow a mailbox access and retention policy. Validate a real delivery using a team-controlled test account after SMTP configuration; no external email was sent during development.

## Social command centre

Home alone owns the social wall. Official Facebook, X, Instagram and YouTube profile panels are the honest fallback. `src/content/media.ts` starts with an empty `curatedPosts` array because no suitable current non-event post set was supplied. Add only verified official posts, dates and approved first-party thumbnail files.

Normalized item fields:

- `id`: stable ID; `platform`: Facebook, X, Instagram or YouTube.
- `url`: approved HTTPS social URL.
- `title` and `excerpt`: objects with hi/en strings.
- `image`: optional local `/images/...` thumbnail path.
- `publishedAt`: optional actual ISO timestamp; do not infer dates.
- `kind`: post or video.

`src/server/social.ts` requests an optional authorized adapter using a server-side token, validates the response, revalidates every 15 minutes and falls back to curated data. Use official APIs and their required permissions. There is no scraping, browser token or immediate heavyweight embed. Post/video links open their original platform. Platform panels are vertically scrollable when populated. Pending platforms do not receive empty panels. The adapter operator must validate account ownership and editorial suitability, not merely URL syntax.

## Gallery and video

One grid, no filters/albums. `galleryItems` in `src/content/media.ts` owns all entries. Current entries are images only: one seated photograph, one portrait cutout and four selected gathering photographs. No promotional event video is included.

A video item accepts a local `src`, `poster`, reviewed hi/en WebVTT `captions` paths and hi/en `transcript`. Publish a video only after checking rights, captions and transcript. Playback is user-initiated with native controls and `playsInline`; switching items unmounts the prior video. Do not reuse excluded event footage. Caption paths are a hi/en locale map; each displayed language selects its reviewed track.

## Content and asset updates

Use `src/content/site.ts` for shared names, navigation, known companies and optional profiles. `home.ts`, `about.ts`, `service.ts` and `harchandpur.ts` contain bilingual page-specific editorial text. Contact/Gallery microcopy remains adjacent to its page component. `Bilingual` tuples are always [Hindi, English]. Preserve exact Hindi name and vision lines. All ten company names stay visible on About, SAVIOR first.

Replace imagery using the same public filename where appropriate, keeping aspect ratios, authentic descriptions and source records. Hero desktop/mobile are separate assets, not alternate crops of the same browser source. Do not put illustrative service imagery into documentary Gallery. Update ASSET_MANIFEST/SOURCES for replacements. No local font binaries are distributed in V3.1; active webfont choices are documented in TYPOGRAPHY_SYSTEM.md.

## SEO and performance

Set the real domain before build. All six page types have localized titles/descriptions, canonical links, hi-IN/en-IN/x-default alternatives, OG and X cards. Person, WebSite and Breadcrumb JSON-LD use supplied facts. No fabricated Event or LocalBusiness schema. Sitemap contains exactly twelve locale URLs. Unsupported locale values are rejected.

Optimized local WebP imagery, responsive next/image sources, lazy below-fold media, production webfonts, statically rendered content and small client boundaries keep the visual design practical. The first hero picture is eager; others are loaded when selected. No autoplay video, heavy WebGL, GSAP, Lottie runtime or third-party social embed bundle. Validate real-world LCP, INP and CLS after deployment; lab/field scores are not claimed.
