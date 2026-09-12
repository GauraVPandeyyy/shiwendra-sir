# V3.1 Typography System

## Hindi

### Yatra One — signature display only
Used for short, high-impact political/constituency phrases in Hero-style contexts. It is deliberately not used for paragraphs, forms or long headings.

### Rajdhani — UI / labels / numbers
Used for navigation, compact badges, small uppercase-style labels, constituency identifiers and controls where a structured, sharper rhythm is useful.

### Arya — body and editorial reading
Used for Hindi body copy and most editorial display contexts. It keeps Devanagari readable over long passages while avoiding the previous generic UI feel.

## English

### Newsreader — editorial/display
Used for large headings, Hero display and editorial statements. It gives the English version a publication/leadership character rather than a startup-template feel.

### IBM Plex Sans — body/UI
Used for navigation, body copy, controls, forms and labels. It remains highly legible while feeling more deliberate than a generic system sans.

## Implementation

Locale layout defines four semantic CSS variables:

- `--type-body`
- `--type-title`
- `--type-ui`
- `--type-signature`

Tailwind exposes these as `font-body`, `font-display`, `font-ui` and `font-signature` through the V4 theme layer. Devanagari line-height is tuned separately from English.

Fonts are loaded as webfonts via the Google Fonts stylesheet. No local font binaries are included in the handoff ZIP. System/serif fallbacks remain available if a font request fails.
