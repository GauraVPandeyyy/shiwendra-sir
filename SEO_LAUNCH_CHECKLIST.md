# SEO Launch Checklist — Shiwendra Kumar Shukla

Technical SEO can make the site highly crawlable and entity-consistent, but no implementation can guarantee a #1 Google position or sitelinks. Ranking and sitelinks remain algorithmic and also depend on authority, links, relevance, freshness and search demand.

## Before production build

- Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS origin with no trailing slash.
- Set `GOOGLE_SITE_VERIFICATION` after adding the property in Google Search Console.
- Confirm the production host forces HTTPS and one canonical hostname.
- Confirm all six Hindi and six English URLs render directly and do not depend on client-only navigation.
- Confirm `/` redirects to `/hi`.

## Indexing and internationalisation

- Verify unique title and description on every page.
- Verify canonical points to the same-language canonical URL.
- Verify reciprocal `hi-IN`, `en-IN` and `x-default` alternates.
- Open `/sitemap.xml` on production and verify every localized URL is present.
- Open `/robots.txt` and verify the sitemap URL uses the production domain.
- Submit `/sitemap.xml` in Google Search Console.
- Use URL Inspection for `/hi`, `/hi/about`, `/hi/harchandpur`, `/hi/janseva`, `/hi/gallery`, `/hi/contact` and their English equivalents after launch.

## Entity signals

- Keep the exact name `Shiwendra Kumar Shukla` and `शिवेन्द्र कुमार शुक्ला` consistent across official channels.
- Add the final official website URL to Facebook, X, Instagram and YouTube profiles where platform controls allow it.
- Keep the four official social URLs in Person `sameAs`.
- Use confirmed identity facts only in structured data.
- Seek genuine links/mentions from relevant public, institutional and local-news sources; do not buy spam links.

## Sitelink-friendly architecture

Keep the main navigation stable and crawlable around:

- Shiwendra / शिवेन्द्र
- Janseva / जनसेवा
- Harchandpur 179 / हरचंदपुर 179
- Gallery / गैलरी
- Jan Samvad / जनसंवाद

Use descriptive internal anchor text and avoid creating thin keyword-only pages solely to target additional sitelinks.

## Images and media

- Keep meaningful alt text on candidate/documentary images.
- Use descriptive filenames for new media where practical.
- Compress large replacements to AVIF/WebP and supply dimensions.
- Do not use representative/AI imagery as evidence of a real event.
- Add VideoObject metadata only when a real video has stable title/date/thumbnail metadata.

## Post-launch

- Check Search Console indexing and enhancement reports after Google crawls the site.
- Monitor 404s and redirect issues after any URL changes.
- Track Core Web Vitals on mobile.
- Update genuine public content when there is substantive new material; do not publish filler merely for freshness.
- Re-run metadata and structured-data validation after significant content/profile changes.
