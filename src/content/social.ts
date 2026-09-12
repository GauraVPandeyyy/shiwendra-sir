import { siteConfig, type Bilingual } from "@/content/site";

export type SocialHighlight = {
  id: string;

  /**
   * Optional local image.
   *
   * Example:
   * /images/social/facebook-1.webp
   *
   * Keep social images inside:
   * public/images/social/
   */
  image?: string;

  /**
   * Hindi + English title.
   * Optional.
   */
  title?: Bilingual;

  /**
   * Hindi + English short caption.
   */
  text: Bilingual;

  /**
   * Original Facebook / Instagram / X post URL.
   */
  url: string;

  /**
   * Display date only.
   * Optional.
   */
  date?: Bilingual;
};

export const socialWall = {
  profileImage: "/images/portraits/shiwendra-cutout.webp",

  facebook: {
    platform: "Facebook" as const,

    profileUrl: siteConfig.facebook,

    handle: "Shiwendra Kumar Shukla",

    description: [
      "जनसंवाद, क्षेत्रीय कार्यक्रम, सार्वजनिक गतिविधियों और सामाजिक पहलों से जुड़े आधिकारिक अपडेट।",
      "Official updates on public outreach, constituency activities, programmes and social initiatives.",
    ] as Bilingual,

    /**
     * यहाँ केवल वे Facebook posts रखें
     * जिन्हें website पर highlight करना चाहते हैं.
     *
     * खाली array रखने पर सिर्फ official profile card दिखेगा.
     */
    highlights: [] as SocialHighlight[],
  },

  youtube: {
    platform: "YouTube" as const,

    profileUrl: siteConfig.youtube,

    handle: "@shiwendra",

    description: [
      "कार्यक्रमों, जनसंवाद, सार्वजनिक गतिविधियों और महत्वपूर्ण वीडियो अपडेट के लिए आधिकारिक YouTube चैनल।",
      "Official YouTube channel for programmes, public outreach and important video updates.",
    ] as Bilingual,

    /**
     * IMPORTANT:
     *
     * यहाँ सिर्फ YouTube VIDEO ID डालनी है.
     *
     * Example URL:
     * https://www.youtube.com/watch?v=AbCdEf12345
     *
     * Then:
     * featuredVideoId: "AbCdEf12345"
     *
     * अगर blank रहेगा तो video player की जगह
     * premium YouTube channel card दिखाई देगा.
     */
    featuredVideoId: "",
  },

  instagram: {
    platform: "Instagram" as const,

    profileUrl: siteConfig.instagram,

    handle: "@shiwendra4rbl",

    description: [
      "जनसंपर्क, कार्यक्रम, यात्राओं और सार्वजनिक जीवन की तस्वीरों व रील्स के लिए आधिकारिक Instagram प्रोफाइल।",
      "Official Instagram profile for photographs, reels, public programmes and outreach.",
    ] as Bilingual,

    highlights: [] as SocialHighlight[],
  },

  x: {
    platform: "X" as const,

    profileUrl: siteConfig.x,

    handle: "@Shiwendra4Rbl",

    description: [
      "सार्वजनिक गतिविधियों, विचारों और महत्वपूर्ण सूचनाओं के लिए आधिकारिक X प्रोफाइल।",
      "Official X profile for public updates, important information and communication.",
    ] as Bilingual,

    highlights: [] as SocialHighlight[],
  },
};
