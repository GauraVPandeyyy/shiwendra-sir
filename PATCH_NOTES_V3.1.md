# Shiwendra Kumar Shukla Website — V3.1 Patch Notes

V3.1 is an in-place refinement of V3. The route architecture and working political design system were retained; high-impact shared components were patched instead of rebuilding the project.

## Functional fixes

- Replaced the mobile menu's fragile native-dialog flow with a controlled React overlay/drawer, body-scroll lock, Escape handling and focus return.
- Replaced the Gallery native-dialog lightbox with a controlled full-screen React lightbox with previous/next, keyboard navigation, Escape and touch-swipe handling.
- Reworked Hero touch handling and interaction pause behavior so swipe, arrows, dots and Pause/Play use one consistent state model.

## Typography and bilingual editorial system

- Removed the previous generic visual font identity from the active UI.
- Hindi now uses Arya for reading/editorial text, Rajdhani for navigation/labels/numbers and Yatra One only for short signature display phrases.
- English now uses Newsreader for editorial/display headings and IBM Plex Sans for body/UI.
- Locale-specific CSS typography tokens keep Devanagari line-height and display rhythm independent from English.
- Important Hindi headings and section copy were rewritten as native public-facing Hindi rather than literal English translations.

## Editorial content presentation

- Improved the shared paragraph renderer with stronger opening sentences, narrower reading measure, accent rail, paragraph separators and increased editorial spacing.
- Added reusable editorial pull-statement treatment.
- Expanded and refined Home, About and Harchandpur copy while keeping page ownership distinct.
- Retained meaningful Janseva depth while improving Hindi headings and visual rhythm.

## Header and navigation

- Kept the requested tall-to-compact header transition.
- Added transparent/glass political header styling and smoother opacity/size transitions.
- Preserved the visible height change while avoiding continuous layout calculations.
- Social links remain visible in header/drawer and via the fixed social rail.

## Hero carousel

- Kept exactly three desktop and three mobile hero assets.
- Desktop is designed around an approximately 56% content / 44% candidate composition.
- Mobile uses a 9:16 presentation frame with content in the upper region and the candidate anchored to the lower region.
- Added richer mask/depth/text/stroke choreography instead of a basic crossfade.
- Autoplay remains approximately five seconds and pauses after manual interaction.

## Portrait presentation

- Reworked the Home introduction and About opening portrait into layered editorial treatments using constituency numbers, badges, frames and depth.
- Reworked the Harchandpur opening visual for a mobile-specific portrait/content composition.
- Added shared portrait-shell styling so candidate photographs no longer feel like plain rectangular image blocks.

## Harchandpur

- Rewrote the seven priorities around `आज की जरूरत` and `विकास की दिशा` rather than FAQ language.
- Added more concrete but non-guaranteed development directions for roads/culverts, drainage, irrigation/farmers, healthcare, education, youth/employment and civic grievance follow-up.
- Improved card hierarchy with numbering, iconography, visuals and motion detail while keeping essential content visible.

## Business presentation

- All ten companies remain visible on About; no dropdown was introduced.
- Added conservative category-level descriptions based only on confirmed company names and the known ecosystem.
- Added sector labels, group identity, numbering, icons and card motion without inventing certifications, scale, turnover or detailed product claims.

## Social media

Configured official profiles:

- Facebook: https://www.facebook.com/ShiwendraKumarShuklaRBL
- X: https://x.com/Shiwendra4Rbl
- Instagram: https://www.instagram.com/shiwendra4rbl/
- YouTube: https://www.youtube.com/@shiwendra

The Home social section now presents all configured platforms in a more substantial dashboard layout. It still supports an authorized normalized feed adapter and does not scrape social sites.

## Gallery and event treatment

- Gallery remains one unified route with real/documentary media only.
- No Kshatriya Samaj event promotion or named feature is present in site copy.
- The user-supplied Mangal Pandey stamp image remains in the About inspiration section.
- Mayawati, Ambedkar and Kanshi Ram visual assets remain part of the inspiration presentation with source notes.

## Footer

- Upgraded PRAIB attribution into a restrained `Digital Experience Partner` treatment with a dedicated linked pill and motion detail.

## SEO

- Strengthened unique bilingual page titles and descriptions.
- Added/expanded canonical, reciprocal hreflang, x-default, Open Graph and X metadata.
- Person `sameAs` now includes Facebook, X, Instagram and YouTube.
- JSON-LD graph contains Person, WebSite, WebPage and inner-page BreadcrumbList data.
- Added optional Google Search Console verification environment variable.

## Files intentionally left structurally unchanged

- Route architecture
- Contact/email endpoint architecture
- Unified content model approach
- Tailwind CSS foundation
- Social adapter safety model
- Sitemap/robots route mechanism
- Existing real/gallery asset organisation unless required by the patch
