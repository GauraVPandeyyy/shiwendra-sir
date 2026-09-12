# Shiwendra Kumar Shukla Official Website — V3.2

V3.2 is an in-place production refinement of V3.1. It preserves the six-page bilingual Next.js/Tailwind architecture while replacing the Hero with the supplied Swiper approach, hardening mobile navigation/gallery behaviour, strengthening BSP identity, rebuilding leadership inspirations, improving Harchandpur presentation and changing the Home social section from generic profile cards to official platform surfaces.

## Run locally

Use a current Node.js version supported by Next.js 16.3.4.

```bash
npm install
copy .env.example .env.local
npm run dev
```

macOS/Linux:

```bash
npm install
cp .env.example .env.local
npm run dev
```

To use another port:

```bash
npm run dev -- --port 4000
```

Production validation:

```bash
npm run lint
npm run typecheck
npm test
npm run build
node scripts/audit-build.mjs
npm start
```

`package-lock.json` is intentionally not shipped because the execution environment could not reach the npm registry after adding Swiper. `npm install` will generate a fresh lock file using the declared dependencies.

## Routes

| Hindi | English |
| --- | --- |
| /hi | /en |
| /hi/about | /en/about |
| /hi/janseva | /en/janseva |
| /hi/harchandpur | /en/harchandpur |
| /hi/gallery | /en/gallery |
| /hi/contact | /en/contact |

`/` redirects to `/hi`.

## Official social profiles

- Facebook: https://www.facebook.com/ShiwendraKumarShuklaRBL
- X: https://x.com/Shiwendra4Rbl
- Instagram: https://www.instagram.com/shiwendra4rbl/
- YouTube: https://www.youtube.com/@shiwendra

The Facebook and X areas use official embedded surfaces. YouTube shows the confirmed official channel; set `NEXT_PUBLIC_YOUTUBE_FEATURED_VIDEO_ID` to feature a specific real public video without changing code.

## Important mobile test note

The supplied terminal log contained a hydration mismatch with an injected `RESPONSIVE-VIEWER-ROOT` node. That node does not exist in this project. Test once in an Incognito/private window with extensions disabled and on the phone browser directly. V3.2 also adds non-hydration fallbacks for the menu and Gallery media links.

## Handoff documents

- `PATCH_NOTES_V3.2.md`
- `TERMINAL_DIAGNOSIS_V3.2.md`
- `ASSET_SOURCES.md`
- `ASSET_MANIFEST.md`
- `SEO_LAUNCH_CHECKLIST.md`
- `ENGINEERING_HANDOFF.md`
- `CONTENT_MAP.md`
- `TYPOGRAPHY_SYSTEM.md`
