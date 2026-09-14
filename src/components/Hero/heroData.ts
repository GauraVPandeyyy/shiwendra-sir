import type { Bilingual } from "@/content/site";

export interface HeroSlideData {
  id: number;
  eyebrow: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
  primaryButton: Bilingual;
  primaryLink: string;
  secondaryButton?: Bilingual;
  secondaryLink?: string;
  desktopImage: string;
  mobileImage: string;
  desktopPosition?: string;
  mobilePosition?: string;
}

export const heroSlides: HeroSlideData[] = [
  {
    id: 1,
    eyebrow: [
      "बसपा प्रभारी/प्रत्याशी • हरचंदपुर • रायबरेली",
      "BSP In-charge / Candidate • Harchandpur • Rae Bareli",
    ],
    title: [
      "शिवेन्द्र कुमार शुक्ला की आधिकारिक वेबसाइट पर आपका स्वागत है",
      "Welcome to the Official Website of Shiwendra Kumar Shukla",
    ],
    subtitle: [
      "जनता से सीधा संवाद, समाजसेवा के प्रति प्रतिबद्धता और हरचंदपुर के विकास से जुड़े विचार—यह आधिकारिक मंच शिवेन्द्र कुमार शुक्ला की सार्वजनिक यात्रा, प्राथमिकताओं और गतिविधियों को एक स्थान पर प्रस्तुत करता है।",
      "A direct public platform for Shiwendra Kumar Shukla’s journey, service commitments, priorities for Harchandpur and continuing dialogue with people.",
    ],
    primaryButton: ["शिवेन्द्र को जानें", "Know Shiwendra"],
    primaryLink: "/about",
    secondaryButton: ["जनसंवाद", "Jan Samvad"],
    secondaryLink: "/contact",
    desktopImage: "/images/gallery/fd1.png",
    mobileImage: "/images/gallery/fm1.png",
    desktopPosition: "center center",
    mobilePosition: "center bottom",
  },
  {
    id: 2,
    eyebrow: [
      "हरचंदपुर के सम्मानित जनता के लिए",
      "FOR THE PEOPLE OF HARCHANDPUR",
    ],
    title: [
      "हरचंदपुर के साथ, हरचंदपुर के विकास के लिए",
      "For the People of Harchandpur. For a Stronger Harchandpur.",
    ],
    subtitle: [
      "सड़क और ग्रामीण संपर्क से लेकर सिंचाई, किसान, नागरिक सुविधाओं और जनसुनवाई तक—विकास की दिशा स्थानीय जरूरतों को सुनने और उन्हें जिम्मेदारी से आगे रखने से बनती है।",
      "From roads, rural connectivity and irrigation to farmers, civic services and public grievance response, development begins by listening to local needs and raising them responsibly.",
    ],
    primaryButton: ["हरचंदपुर की प्राथमिकताएँ", "Harchandpur Priorities"],
    primaryLink: "/harchandpur",
    secondaryButton: ["अपनी बात रखें", "Share Your Concern"],
    secondaryLink: "/contact",
    desktopImage: "/images/gallery/fd2.png",
    mobileImage: "/images/gallery/fm2.png",
    desktopPosition: "center center",
    mobilePosition: "center bottom",
  },
  {
    id: 3,
    eyebrow: [
      "उद्यम • समाजसेवा • सार्वजनिक जिम्मेदारी",
      "ENTERPRISE • SERVICE • PUBLIC RESPONSIBILITY",
    ],
    title: [
      "व्यवसाय से बढ़कर, समाजसेवा का संकल्प",
      "Beyond Business, a Commitment to Public Service",
    ],
    subtitle: [
      "स्वास्थ्य और संबंधित क्षेत्रों में वर्षों के व्यावसायिक अनुभव ने संगठन और जिम्मेदारी की समझ दी; समाज के बीच के अनुभव ने उसी क्षमता को जरूरतमंद जनता और व्यापक जनसेवा से जोड़ने की दिशा दी।",
      "Years of enterprise across healthcare and related fields built organisational experience; public engagement gave that experience a wider purpose through service and social responsibility.",
    ],
    primaryButton: ["जनसेवा की दिशा", "Public Service"],
    primaryLink: "/janseva",
    secondaryButton: ["व्यावसायिक यात्रा", "Business Journey"],
    secondaryLink: "/about#business",
    desktopImage: "/images/gallery/fd3.png",
    mobileImage: "/images/gallery/fm3.png",
    desktopPosition: "center center",
    mobilePosition: "center bottom",
  },
];
