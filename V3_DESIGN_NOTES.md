# V3.1 design notes

V3.1 is a surgical refinement of V3, not a rebuild. Political/public leadership remains primary, Janseva secondary and business credibility tertiary.

## Visual direction

The blue/gold/ivory political identity is retained. V3.1 improves the visible experience through typography, layered portrait framing, richer editorial paragraph treatment, an intentional glass header, a stronger Hero, more expressive development/company cards and a larger social-media presence.

Hindi typography now combines Arya for reading, Rajdhani for UI/labels/numbers and Yatra One selectively for signature Hero phrases. English uses Newsreader for display and IBM Plex Sans for body/UI. Hindi copy is written independently rather than treated as a literal translation of English.

## Header and motion

The requested tall-to-compact scroll behaviour remains. The initial header is translucent/glass; on scroll the utility layer visually collapses and the main bar becomes more compact. The visible height change is intentional. The implementation uses a passive scroll listener and animation-frame scheduling to avoid constant layout work.

The Hero keeps exactly three desktop and three mobile assets. Desktop is composed around roughly 56% text / 44% candidate; mobile is presented in a 9:16 frame with the candidate anchored low and the copy occupying the upper region. Motion combines image reveal, number depth, text sequencing and line/CTA choreography rather than one repeated fade.

Mobile navigation and Gallery lightbox no longer rely on native `<dialog>`; both use controlled overlays for more reliable browser/device behaviour.

## Page ownership

Major storytelling remains page-specific. Home owns the social command centre and compact public/business teasers. About owns life journey, inspiration portraits and all ten company cards. Janseva owns detailed service narratives. Harchandpur owns the seven development priorities. Gallery owns documentary media. Contact owns Jan Samvad.

No named Kshatriya Samaj promotion appears in public site copy.
