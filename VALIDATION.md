# Validation — V3.2

## Completed in this environment

- Parsed/transpiled all 40 `.ts`/`.tsx` source files with the TypeScript compiler API: 0 syntax errors.
- Confirmed all six Hero image files exist; mobile Hero files are true 1080×1920 (9:16) and desktop files remain 16:9-oriented.
- Confirmed visible component code contains no decorative 179 motif; the number remains only in formal Harchandpur constituency context.
- Confirmed no Mangal Pandey source/public asset reference remains.
- Confirmed Harchandpur priority records 04, 05 and 06 have no image field.
- Confirmed no `<dialog>` or `<details>` remains in app source for menu/gallery behaviour.
- Confirmed App Router favicon exists and remote Wikimedia hosts are allowed for licensed inspiration/BSP visuals.

## Could not be completed here

A clean `npm install`/production build could not be completed because this execution environment timed out reaching the npm registry after the Swiper dependency was added. The package declaration is included and the stale lock file was deliberately removed. Run `npm install` on the target machine, then execute lint/typecheck/test/build commands from README.

## Real-device checks required after `npm install`

- Mobile menu open/close at top and after navbar compacts.
- Hero swipe, arrows and pagination.
- Gallery lightbox; also verify raw-media fallback by disabling JavaScript if desired.
- Facebook/X external embeds under the production browser/privacy settings.
- 320/360/390/430px overflow and mobile social rail.
