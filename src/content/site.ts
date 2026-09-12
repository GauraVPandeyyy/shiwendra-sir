export const locales = ["hi", "en"] as const;
export type Locale = (typeof locales)[number];
export type Bilingual = readonly [string, string];
export const say = (locale: Locale, text: Bilingual) =>
  text[locale === "hi" ? 0 : 1];
export const pick = (locale: Locale, hi: string, en: string) =>
  locale === "hi" ? hi : en;

export const siteConfig = {
  nameHi: "शिवेन्द्र कुमार शुक्ला",
  nameEn: "Shiwendra Kumar Shukla",
  facebook: "https://www.facebook.com/ShiwendraKumarShuklaRBL",
  x: "https://x.com/Shiwendra4Rbl",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://www.instagram.com/shiwendra4rbl/",
  youtube:
    process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@shiwendra",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  publicEmail: process.env.NEXT_PUBLIC_PUBLIC_EMAIL || "",
};

export const name = (locale: Locale) =>
  locale === "hi" ? siteConfig.nameHi : siteConfig.nameEn;

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const nav: Record<Locale, NavItem[]> = {
  hi: [
    {
      label: "शिवेन्द्र",
      href: "/about",
      children: [
        {
          label: "परिचय",
          href: "/about",
        },
        {
          label: "जीवन यात्रा",
          href: "/about#life-story",
        },
        {
          label: "व्यावसायिक यात्रा",
          href: "/about#business",
        },
      ],
    },

    {
      label: "हरचंदपुर",
      href: "/harchandpur",
      children: [
        {
          label: "हरचंदपुर के लिए दृष्टि",
          href: "/harchandpur#vision",
        },
        {
          label: "विकास की प्राथमिकताएँ",
          href: "/harchandpur#priorities",
        },
      ],
    },

    {
      label: "जनसेवा",
      href: "/janseva",
      children: [
        {
          label: "स्वास्थ्य सहायता",
          href: "/janseva#healthcare",
        },
        {
          label: "शिक्षा एवं अवसर",
          href: "/janseva#education",
        },
        {
          label: "सामाजिक सहयोग",
          href: "/janseva#community-support",
        },
      ],
    },

    {
      label: "मीडिया",
      href: "/media",
      children: [
        {
          label: "गैलरी",
          href: "/media#gallery",
        },

        // अभी content नहीं है, इसलिए दोनों Media root पर ही जाएँगे.
        {
          label: "मीडिया कवरेज",
          href: "/media",
        },
        {
          label: "प्रेस रिलीज",
          href: "/media",
        },
      ],
    },

    {
      label: "जनसंवाद",
      href: "/contact",
      children: [
        {
          label: "शिवेन्द्र कुमार शुक्ला को लिखें",
          href: "/contact#jan-samvad",
        },
      ],
    },
  ],

  en: [
    {
      label: "Shiwendra",
      href: "/about",
      children: [
        {
          label: "About",
          href: "/about",
        },
        {
          label: "Journey",
          href: "/about#life-story",
        },
        {
          label: "Business Journey",
          href: "/about#business",
        },
      ],
    },

    {
      label: "Harchandpur",
      href: "/harchandpur",
      children: [
        {
          label: "Vision for Harchandpur",
          href: "/harchandpur#vision",
        },
        {
          label: "Development Priorities",
          href: "/harchandpur#priorities",
        },
      ],
    },

    {
      label: "Public Service",
      href: "/janseva",
      children: [
        {
          label: "Healthcare Support",
          href: "/janseva#healthcare",
        },
        {
          label: "Education & Opportunity",
          href: "/janseva#education",
        },
        {
          label: "Community Support",
          href: "/janseva#community-support",
        },
      ],
    },

    {
      label: "Media",
      href: "/media",
      children: [
        {
          label: "Gallery",
          href: "/media#gallery",
        },
        {
          label: "Media Coverage",
          href: "/media",
        },
        {
          label: "Press Releases",
          href: "/media",
        },
      ],
    },

    {
      label: "Connect",
      href: "/contact",
      children: [
        {
          label: "Write to Shiwendra Kumar Shukla",
          href: "/contact#jan-samvad",
        },
      ],
    },
  ],
};
export const candidate: Bilingual = [
  "बसपा प्रभारी/प्रत्याशी — हरचंदपुर विधानसभा क्षेत्र, रायबरेली, उत्तर प्रदेश",
  "BSP In-charge / Candidate — Harchandpur Assembly Constituency, Rae Bareli, Uttar Pradesh",
];

export const copy = {
  hi: {
    candidate: candidate[0],
    contact: {
      lead: "अपने गाँव या क्षेत्र की जनसमस्या, सहायता से जुड़ा विषय, कोई सुझाव या मुलाकात का अनुरोध साझा करें। स्थान और जरूरी संदर्भ लिखें, ताकि आपकी बात को सही ढंग से समझा जा सके।",
      formTitle: "अपनी बात सीधे साझा करें",
      // privacyTitle: "आपकी जानकारी, आपकी निजता",
      // privacy:
      //   "दी गई जानकारी का उपयोग आपकी बात समझने, आवश्यक अनुवर्ती संवाद और आपसे संपर्क के लिए किया जाएगा। कृपया आधार संख्या, बैंक विवरण, चिकित्सा रिपोर्ट या अन्य संवेदनशील दस्तावेज़ यहाँ साझा न करें।",
    },
  },
  en: {
    candidate: candidate[1],
    contact: {
      lead: "Share a local concern, assistance enquiry, suggestion or meeting request. Include the place and relevant context so the team can understand the issue clearly and consider an appropriate next step.",
      formTitle: "Share what matters",
      privacyTitle: "Your information. Your privacy.",
      privacy:
        "Your information will be used to understand your enquiry, support appropriate follow-up and contact you. Please do not include Aadhaar numbers, bank details, medical reports or other sensitive documents.",
    },
  },
};

export interface CompanyProfile {
  name: string;
  sector: Bilingual;
  description: Bilingual;
}

export const saviorCompanies: CompanyProfile[] = [
  {
    name: "SAVIOR Healthcare Foundation (India)",
    sector: ["स्वास्थ्य एवं सामाजिक पहल", "Healthcare & social initiatives"],
    description: [
      "स्वास्थ्य, सामुदायिक सरोकार और जरूरतमंद परिवारों तक सहयोग की सोच से जुड़ी संस्थागत पहल।",
      "An institutional initiative focused on healthcare, community concerns and support-oriented social engagement.",
    ],
  },
  {
    name: "SAVIOR Heart Multispecialty Hospital & Research Centre Private Limited",
    sector: ["अस्पताल एवं स्वास्थ्य सेवाएँ", "Hospital & healthcare services"],
    description: [
      "बहु-विशेषता अस्पताल आधारित स्वास्थ्य सेवाओं, उपचार और संस्थागत चिकित्सा देखभाल से जुड़ा उपक्रम।",
      "An enterprise associated with multispecialty hospital-based care, treatment and institutional healthcare services.",
    ],
  },
  {
    name: "SAVIOR Institute of Nursing and Paramedical Sciences (SINPS)",
    sector: [
      "नर्सिंग एवं पैरामेडिकल शिक्षा",
      "Nursing & paramedical education",
    ],
    description: [
      "नर्सिंग, पैरामेडिकल शिक्षा और स्वास्थ्य क्षेत्र के लिए प्रशिक्षित मानव संसाधन तैयार करने की दिशा से जुड़ा संस्थान।",
      "An institution associated with nursing, paramedical education and the development of trained healthcare professionals.",
    ],
  },
  {
    name: "SAVIOR Diagnostic Centre Pvt. Ltd.",
    sector: ["डायग्नोस्टिक्स", "Diagnostics"],
    description: [
      "जाँच और डायग्नोस्टिक सेवाओं से जुड़ी स्वास्थ्य इकाई, जो स्वास्थ्य-सेवा तंत्र के एक महत्वपूर्ण हिस्से का प्रतिनिधित्व करती है।",
      "A healthcare unit associated with diagnostic and testing services within the wider healthcare ecosystem.",
    ],
  },
];

export const rsmsCompanies: CompanyProfile[] = [
  {
    name: "Aadishri Medical Equipments Pvt. Ltd.",
    sector: ["मेडिकल उपकरण", "Medical equipment"],
    description: [
      "स्वास्थ्य संस्थानों में उपयोग होने वाले चिकित्सा उपकरण और संबंधित संस्थागत जरूरतों से जुड़ा व्यावसायिक उपक्रम।",
      "A business associated with medical equipment and related institutional requirements in the healthcare sector.",
    ],
  },
  {
    name: "Ayushman Pharmacy",
    sector: ["फार्मेसी", "Pharmacy"],
    description: [
      "औषधि और फार्मेसी क्षेत्र से जुड़ी इकाई, जो स्वास्थ्य सेवाओं की दैनिक आपूर्ति-श्रृंखला का हिस्सा है।",
      "A pharmacy-focused unit associated with medicines and the everyday supply side of healthcare services.",
    ],
  },
  {
    name: "Kepler Medical Devices Private Limited",
    sector: ["मेडिकल डिवाइस", "Medical devices"],
    description: [
      "चिकित्सा उपकरणों और मेडिकल डिवाइस से जुड़े क्षेत्र में कार्य करने वाली व्यावसायिक इकाई।",
      "A business operating in the field of medical devices and healthcare-related equipment.",
    ],
  },
  {
    name: "Riddhi Siddhi Medical and Surgicals Pvt. Ltd.",
    sector: ["मेडिकल एवं सर्जिकल", "Medical & surgical supplies"],
    description: [
      "मेडिकल और सर्जिकल जरूरतों से जुड़े उत्पादों व संस्थागत आपूर्ति के क्षेत्र से संबंधित उपक्रम।",
      "An enterprise associated with medical and surgical requirements and institutional supply needs.",
    ],
  },
  {
    name: "Samriddhi Techno Concept Private Limited",
    sector: ["तकनीक एवं सेवाएँ", "Technology & services"],
    description: [
      "तकनीक, व्यावसायिक प्रक्रियाओं और सेवा-आधारित समाधानों से जुड़ी संस्थागत पहल।",
      "An institutional initiative associated with technology, business processes and service-led solutions.",
    ],
  },
  {
    name: "Samriddhi Hospitality Private Limited",
    sector: ["आतिथ्य", "Hospitality"],
    description: [
      "आतिथ्य और सेवा क्षेत्र से जुड़ा उपक्रम, जो समूह की विविध व्यावसायिक उपस्थिति का हिस्सा है।",
      "A hospitality-focused enterprise forming part of the group’s wider and diversified business presence.",
    ],
  },
];

export interface Chapter {
  title: Bilingual;
  lead?: Bilingual;
  paragraphs: Bilingual[];
}
