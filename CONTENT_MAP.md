# V3 content ownership

Locales: hi and en. Hindi is default. The root redirects permanently to /hi. No additional content routes.

| Route | Sole ownership of major sections | File |
| --- | --- | --- |
| /{locale} | Three-slide hero; constituency pulse; political introduction; brief journey motif; image-rich service teaser; development teaser; social command centre; two-group credibility strip; two-image personal/public visual strip; gold participation close | src/components/pages/home.tsx; src/content/home.ts |
| /{locale}/about | Deep biography; early responsibility; education; employment-to-enterprise story; visual timeline; values; public philosophy; all four inspiration profiles; business journey; SAVIOR four companies then RSMS six companies; personal closing statement | src/components/pages/about.tsx; src/content/about.ts |
| /{locale}/janseva | Full service philosophy; healthcare access and serious illness support; education; families and girls; crisis/COVID context; rural concerns; youth; grievances/community; future service direction; service-specific invitation | src/components/pages/janseva.tsx; src/content/service.ts |
| /{locale}/harchandpur | Constituency introduction; understanding local experience; development philosophy; seven visible priorities; integrated development; public working style; exact three vision lines; constituency participation | src/components/pages/harchandpur.tsx; src/content/harchandpur.ts |
| /{locale}/gallery | Unified real-media grid; four selected gathering photographs with neutral descriptions; portrait/seated photograph; modal lightbox | src/components/pages/gallery.tsx; src/content/media.ts |
| /{locale}/contact | Participation hero; issue selector; five-field form; privacy; clear-context guidance; follow-up explanation; channel limitations | src/components/pages/contact.tsx; src/components/contact-form.tsx |

Shared global elements: header, footer, language switch, social rail/dock, typography and button primitives. Full company, inspiration, service, priority, social-wall, gallery-grid and timeline sections each belong to exactly one page. Home previews are separately composed and separately written. Optional technical endpoints /api/contact, /sitemap.xml and /robots.txt do not create extra content pages.

## Editorial ownership

- Official Hindi name: शिवेन्द्र कुमार शुक्ला.
- Official English name: Shiwendra Kumar Shukla.
- व्यावसायिक नेतृत्व is the approved Hindi label.
- SAVIOR precedes RSMS wherever both appear.
- No event promotion, featured event, event-video feature or event route.
- No fabricated current posts, dates or company claims.
- Dates in biography: 22 May 1993; B.Com. completion 2012; active in business since 2014.
- Inspiration means public ideas, not endorsement or a personal relationship.
