import type { Metadata } from "next";

import { Locale, name, copy, siteConfig } from "@/content/site";

export const origin = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

/* =========================================================
   CANONICAL PUBLIC ROUTES
========================================================= */

export const paths = [
  "",
  "/about",
  "/harchandpur",
  "/janseva",
  "/media",
  "/contact",
] as const;

export type SeoPath = (typeof paths)[number];

/* =========================================================
   TITLES
========================================================= */

export const pageNames: Record<Locale, Record<SeoPath, string>> = {
  hi: {
    "": "शिवेन्द्र कुमार शुक्ला | आधिकारिक वेबसाइट | हरचंदपुर",

    "/about": "शिवेन्द्र कुमार शुक्ला | परिचय, जीवन यात्रा और व्यावसायिक सफर",

    "/harchandpur": "हरचंदपुर के लिए विकास की दिशा | शिवेन्द्र कुमार शुक्ला",

    "/janseva": "जनसेवा | शिवेन्द्र कुमार शुक्ला",

    "/media": "मीडिया एवं गैलरी | शिवेन्द्र कुमार शुक्ला",

    "/contact": "जनसंवाद | शिवेन्द्र कुमार शुक्ला को लिखें",
  },

  en: {
    "": "Shiwendra Kumar Shukla | Official Website | Harchandpur",

    "/about": "About Shiwendra Kumar Shukla | Journey & Business Leadership",

    "/harchandpur": "Vision for Harchandpur | Shiwendra Kumar Shukla",

    "/janseva": "Public Service | Shiwendra Kumar Shukla",

    "/media": "Media & Gallery | Shiwendra Kumar Shukla",

    "/contact": "Jan Samvad | Write to Shiwendra Kumar Shukla",
  },
};

/* =========================================================
   META DESCRIPTIONS
========================================================= */

const descriptions: Record<Locale, Record<SeoPath, string>> = {
  hi: {
    "": "शिवेन्द्र कुमार शुक्ला की आधिकारिक वेबसाइट। बहुजन समाज पार्टी के प्रभारी/प्रत्याशी के रूप में हरचंदपुर, रायबरेली में जनसेवा, विकास की प्राथमिकताओं और जनसंवाद से जुड़ी जानकारी।",

    "/about":
      "शिवेन्द्र कुमार शुक्ला का परिचय, जीवन यात्रा, लखनऊ विश्वविद्यालय से शिक्षा, सामाजिक जीवन, सार्वजनिक भूमिका तथा SAVIOR और RSMS समूहों से जुड़ी व्यावसायिक यात्रा।",

    "/harchandpur":
      "हरचंदपुर में सड़क, सिंचाई, जल निकासी, किसान, स्वास्थ्य, शिक्षा, युवा, रोजगार और जनसमस्याओं से जुड़ी विकास प्राथमिकताओं तथा सार्वजनिक दृष्टि को जानें।",

    "/janseva":
      "शिवेन्द्र कुमार शुक्ला के जनसेवा सरोकार—स्वास्थ्य सहायता, शिक्षा, जरूरतमंद परिवारों के सहयोग, ग्रामीण विषयों, युवाओं और स्थानीय जनसमस्याओं से जुड़ी पहल।",

    "/media":
      "शिवेन्द्र कुमार शुक्ला की आधिकारिक मीडिया और गैलरी—सार्वजनिक जीवन, जनसंपर्क, सामाजिक सहभागिता तथा अन्य वास्तविक फोटो और मीडिया सामग्री।",

    "/contact":
      "शिवेन्द्र कुमार शुक्ला को सीधे लिखें। हरचंदपुर से जुड़ी जनसमस्या, सुझाव, सहायता का विषय या मुलाकात का अनुरोध जनसंवाद के माध्यम से साझा करें।",
  },

  en: {
    "": "Official website of Shiwendra Kumar Shukla, BSP In-charge / Candidate in Harchandpur, Rae Bareli. Explore public service, development priorities and Jan Samvad.",

    "/about":
      "Learn about Shiwendra Kumar Shukla, his education, personal journey, public life, business experience and association with the SAVIOR and RSMS groups.",

    "/harchandpur":
      "Explore Shiwendra Kumar Shukla's development priorities for Harchandpur across roads, drainage, irrigation, farmers, healthcare, education, youth and civic response.",

    "/janseva":
      "Explore Shiwendra Kumar Shukla's public-service concerns across healthcare, education, families in need, rural communities, youth and local civic issues.",

    "/media":
      "Official media and gallery of Shiwendra Kumar Shukla featuring photographs and visual records from public life, community engagement and social participation.",

    "/contact":
      "Write to Shiwendra Kumar Shukla through Jan Samvad to share a local concern, suggestion, assistance enquiry or meeting request.",
  },
};

/* =========================================================
   METADATA
========================================================= */

export function pageMetadata(locale: Locale, path: SeoPath): Metadata {
  const title = pageNames[locale][path];

  const description = descriptions[locale][path];

  const canonical = `/${locale}${path}`;

  const oppositeLocale = locale === "hi" ? "en" : "hi";

  return {
    metadataBase: new URL(origin),

    title,

    description,

    applicationName: "Shiwendra Kumar Shukla Official Website",

    creator: "Shiwendra Kumar Shukla",

    publisher: "Shiwendra Kumar Shukla",

    authors: [
      {
        name: "Shiwendra Kumar Shukla",
        url: `${origin}/${locale}/about`,
      },
    ],

    alternates: {
      canonical,

      languages: {
        "hi-IN": `/hi${path}`,
        "en-IN": `/en${path}`,
        "x-default": `/hi${path}`,
      },
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",

      url: canonical,

      title,

      description,

      locale: locale === "hi" ? "hi_IN" : "en_IN",

      alternateLocale: oppositeLocale === "hi" ? "hi_IN" : "en_IN",

      siteName:
        locale === "hi"
          ? "शिवेन्द्र कुमार शुक्ला — आधिकारिक वेबसाइट"
          : "Shiwendra Kumar Shukla — Official Website",

      images: [
        {
          url: "/images/hero/hero-political-desktop.webp",

          width: 1672,

          height: 941,

          alt:
            locale === "hi"
              ? "शिवेन्द्र कुमार शुक्ला"
              : "Shiwendra Kumar Shukla",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      site: "@Shiwendra4Rbl",

      creator: "@Shiwendra4Rbl",

      title,

      description,

      images: ["/images/hero/hero-political-desktop.webp"],
    },

    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        }
      : undefined,
  };
}

/* =========================================================
   JSON-LD
========================================================= */

export function StructuredData({
  locale,
  path = "",
}: {
  locale: Locale;
  path?: SeoPath;
}) {
  const title = pageNames[locale][path];

  const description = descriptions[locale][path];

  const currentUrl = `${origin}/${locale}${path}`;

  const personId = `${origin}/#person`;

  const siteId = `${origin}/#website`;

  const webpageId = `${currentUrl}#webpage`;

  const data = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Person",

        "@id": personId,

        name: "Shiwendra Kumar Shukla",

        alternateName: "शिवेन्द्र कुमार शुक्ला",

        // Stable canonical Person page
        url: `${origin}/en/about`,

        description: copy[locale].candidate,

        birthDate: "1993-05-22",

        image: {
          "@type": "ImageObject",

          url: `${origin}/images/portraits/shiwendra-composed.webp`,
        },

        alumniOf: {
          "@type": "CollegeOrUniversity",

          name: "Lucknow University",
        },

        sameAs: [
          siteConfig.facebook,
          siteConfig.x,
          siteConfig.instagram,
          siteConfig.youtube,
        ].filter(Boolean),
      },

      {
        "@type": "WebSite",

        "@id": siteId,

        url: origin,

        name: "Shiwendra Kumar Shukla Official Website",

        alternateName: "शिवेन्द्र कुमार शुक्ला आधिकारिक वेबसाइट",

        inLanguage: ["hi-IN", "en-IN"],

        about: {
          "@id": personId,
        },

        publisher: {
          "@id": personId,
        },
      },

      {
        "@type":
          path === "/about"
            ? "ProfilePage"
            : path === "/media"
              ? "CollectionPage"
              : "WebPage",

        "@id": webpageId,

        url: currentUrl,

        name: title,

        description,

        inLanguage: locale === "hi" ? "hi-IN" : "en-IN",

        isPartOf: {
          "@id": siteId,
        },

        ...(path === "/about"
          ? {
              mainEntity: {
                "@id": personId,
              },
            }
          : {}),

        about: {
          "@id": personId,
        },

        primaryImageOfPage: {
          "@type": "ImageObject",

          url: `${origin}/images/hero/hero-political-desktop.webp`,
        },
      },

      ...(path
        ? [
            {
              "@type": "BreadcrumbList",

              "@id": `${currentUrl}#breadcrumb`,

              itemListElement: [
                {
                  "@type": "ListItem",

                  position: 1,

                  name: locale === "hi" ? "मुख्य पृष्ठ" : "Home",

                  item: `${origin}/${locale}`,
                },

                {
                  "@type": "ListItem",

                  position: 2,

                  name: title,

                  item: currentUrl,
                },
              ],
            },
          ]
        : []),
    ],
  };

  return JSON.stringify(data).replace(/</g, "\\u003c");
}
