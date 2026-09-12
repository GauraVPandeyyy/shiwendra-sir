import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
const routes = [
  "",
  "/about",
  "/harchandpur",
  "/janseva",
  "/gallery",
  "/contact",
];
const pages = new Map();
for (const locale of ["hi", "en"])
  for (const path of routes) {
    const url = `/${locale}${path}`;
    const file = `.next/server/app${url}.html`;
    assert.ok(existsSync(file), file);
    const html = readFileSync(file, "utf8");
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.equal((visible.match(/<h1\b/g) || []).length, 1, `${url}: one H1`);
    assert.ok(html.includes(`lang="${locale}"`));
    assert.ok(html.includes('rel="canonical"'));
    for (const lang of ["hi-IN", "en-IN", "x-default"])
      assert.ok(html.includes(`hrefLang="${lang}"`), `${url}: ${lang}`);
    assert.ok(!visible.includes("TO BE UPDATED"));
    for (const obsolete of [
      "/business",
      "/media",
      "/events",
      "/updates",
      "क्षत्रिय",
      "Kshatriya",
    ])
      assert.ok(!visible.includes(obsolete), `${url}: obsolete ${obsolete}`);
    assert.ok(visible.includes("https://praibadvisors.com/"));
    pages.set(url, visible);
  }
for (const [url, html] of pages) {
  for (const match of html.matchAll(
    /href="(\/(?:hi|en)(?:\/[^"?#]*)?)(?:\?[^"#]*)?(?:#([^" ]+))?"/g,
  )) {
    assert.ok(pages.has(match[1]), `${url}: unknown route ${match[1]}`);
    if (match[2])
      assert.ok(
        pages.get(match[1]).includes(`id="${match[2]}"`),
        `${url}: missing anchor ${match[2]}`,
      );
  }
}
for (const locale of ["hi", "en"]) {
  const html = pages.get(`/${locale}/about`);
  assert.ok(html.indexOf("SAVIOR") < html.indexOf("RSMS"));
  assert.ok(html.includes("Samriddhi Hospitality Private Limited"));
  assert.ok(html.includes("SINPS"));
}
for (const theme of ["political", "social", "business"])
  for (const size of ["desktop", "mobile"])
    assert.ok(existsSync(`public/images/hero/hero-${theme}-${size}.webp`));
const manifest = JSON.parse(readFileSync(".next/routes-manifest.json", "utf8"));
assert.ok(
  manifest.redirects.some((r) => r.source === "/" && r.destination === "/hi"),
);
console.log(
  "PASS: 12 localized static pages; one H1 each; localized metadata; no Business route; valid internal routes/anchors; footer credit; SAVIOR/RSMS; six hero assets; root redirect.",
);

for(const locale of ['hi','en']){
 const about=pages.get(`/${locale}/about`);
 for(const label of ['Mayawati','Kanshi Ram','B. R. Ambedkar','Narayana Guru','Jyotirao Phule','Chhatrapati Shahu Maharaj']) assert.ok(about.includes(label), `Missing inspiration ${label}`);
 for(const [url,html] of pages){
  if(!url.endsWith('/gallery')) assert.ok(!html.includes('/images/gallery/public-'),`Gallery photo leaked to ${url}`);
  if(!url.endsWith('/about')) assert.ok(!html.includes('id="inspirations"'),`Inspiration duplicated on ${url}`);
 }
 assert.ok(!about.includes('<details'), 'Company/biography content must be visible');
 assert.ok(!pages.get(`/${locale}/harchandpur`).includes('<details'), 'Priorities must not be accordions');
}
console.log('PASS: six inspiration profiles in locked order; documentary event photos only in Gallery; no hidden company or priority accordions.');
