export interface SocialPost {
  id: string;
  platform: "Facebook" | "X" | "Instagram" | "YouTube";
  url: string;
  title: { hi: string; en: string };
  excerpt: { hi: string; en: string };
  image?: string;
  publishedAt?: string;
  kind: "post" | "video";
}
// Add only approved, non-event promotional official posts with verified URLs and dates.
export const curatedPosts: SocialPost[] = [];
export interface GalleryItem {
  id: string;
  src: string;
  //alt: { hi: string; en: string };
  kind: "image" | "video";
  poster?: string;
  captions?: { hi: string; en: string };
  transcript?: { hi: string; en: string };
}
export const galleryItems: GalleryItem[] = [
  {
    id: "seated",
    kind: "image",
    src: "/images/gallery/public-0.png",
    // alt: {
    //   hi: "कक्ष में बैठे शिवेन्द्र कुमार शुक्ला",
    //   en: "Shiwendra Kumar Shukla seated indoors",
    // },
  },
  {
    id: "public-1",
    kind: "image",
    src: "/images/gallery/public-1.webp",
    // alt: {
    //   hi: "मेज के आसपास बैठे प्रतिभागी",
    //   en: "Participants seated around a table",
    // },
  },
  {
    id: "public-2",
    kind: "image",
    src: "/images/gallery/public-2.webp",
    // alt: {
    //   hi: "बैठक के दौरान बातचीत",
    //   en: "A conversation during a gathering",
    // },
  },
  {
    id: "public-3",
    kind: "image",
    src: "/images/gallery/public-3.jpeg",
    // alt: {
    //   hi: "शिवेन्द्र कुमार शुक्ला का पोर्ट्रेट",
    //   en: "Portrait of Shiwendra Kumar Shukla",
    // },
  },
  {
    id: "public-4",
    kind: "image",
    src: "/images/gallery/public-4.png",
    // alt: {
    //   hi: "स्मृति-चिह्न प्रस्तुत करते हुए प्रतिभागी",
    //   en: "Participants presenting a memento",
    // },
  },
  {
    id: "public-5",
    kind: "image",
    src: "/images/gallery/public-5.jpg",
  },
  {
    id: "public-6",
    kind: "image",
    src: "/images/gallery/public-6.jpg",
  },
  {
    id: "public-7",
    kind: "image",
    src: "/images/gallery/public-7.jpeg",
  },
  {
    id: "public-9",
    kind: "image",
    src: "/images/gallery/public-9.jpeg",
  },
];
