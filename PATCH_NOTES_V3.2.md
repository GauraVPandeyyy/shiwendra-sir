# V3.2 patch notes

V3.2 is an in-place patch of V3.1. Routes and the working Tailwind/content architecture are preserved.

## Main changes

- Replaced the prior Home Hero implementation with the supplied Gaurav-style Swiper architecture, adapted to Shiwendra Kumar Shukla.
- Hero copy is now: official-site welcome; Harchandpur people/development; business-to-social-service direction.
- Exactly three desktop 16:9 compositions and three dedicated mobile 9:16 compositions are used. Mobile source art was extended vertically without stretching the candidate portrait so the upper area remains usable for copy.
- Restored the preferred solid-navy, tall-to-compact navbar visual. Mobile menu no longer depends on `<dialog>`; a native checkbox/label control provides a pre-hydration fallback.
- Gallery cards are progressive links: after hydration they open the controlled lightbox; before/without hydration they still open the original media.
- Changed public status to BSP `प्रभारी/प्रत्याशी` / `In-charge / Candidate` throughout visible candidate copy and SEO identity.
- Removed decorative `179` usage. It remains only where useful as formal constituency/SEO context.
- Added BSP election-elephant visual accents and a dedicated political-identity section.
- Rebuilt the leadership inspiration section in the requested order: Mayawati, Kanshi Ram, Dr. B. R. Ambedkar, Narayana Guru, Jyotirao Phule, Chhatrapati Shahu Maharaj. Mangal Pandey removed.
- Removed photos from Harchandpur priority cards 04/05/06; those cards now use icon/pattern visual systems instead.
- Replaced generic four-profile social cards with a platform dashboard: Facebook Page timeline, X timeline, official Instagram profile panel and official YouTube channel/optional real featured video.
- Kept Facebook, X, Instagram and YouTube fixed in the responsive social rail.
- Added App Router favicon, smooth-scroll metadata hint, explicit Home education image height and LAN dev-origin configuration based on the supplied terminal log.
- Updated asset/source documentation and removed visible production placeholder copy.

## Deliberately unchanged

- Six public routes per locale.
- Tailwind CSS design system.
- Hindi/English typography introduced in V3.1.
- Company architecture and conservative descriptions.
- Jan Samvad backend architecture.
- Kshatriya-event rule: no site story/promotion; only neutral documentary Gallery usage.
