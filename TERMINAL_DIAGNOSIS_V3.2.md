# Terminal diagnosis — V3.2

The supplied log showed the Next.js server and localized routes returning HTTP 200. The main actionable issues were browser/runtime warnings rather than route failures.

## Addressed in this patch

- `/favicon.ico` 404: added App Router favicon.
- Smooth-scroll warning: added `data-scroll-behavior="smooth"` to `<html>`.
- Favicon aspect-ratio warning: header images now preserve intrinsic aspect ratio with `w-auto`.
- Education `fill` image height warning: its Home parent now has an explicit height.
- LAN development HMR origin `192.168.18.22`: added to `allowedDevOrigins`.
- Mobile menu: no longer depends on `<dialog>` or React state just to open; it has a native checkbox/label fallback.
- Gallery: tiles remain real links if hydration fails and enhance into the React lightbox after hydration.

## Important hydration finding

The supplied hydration diff contained an injected node with `id="RESPONSIVE-VIEWER-ROOT"`. That node is not part of this website source. Browser extensions that modify the HTML before React hydrates can cause hydration mismatches and prevent client interactions from attaching correctly. Test the site once in Chrome/Edge Incognito with extensions disabled, and on the real phone browser directly, before attributing a remaining interaction failure to the website code.
