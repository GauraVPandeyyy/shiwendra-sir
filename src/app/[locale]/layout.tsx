import { notFound } from "next/navigation";
import { locales, Locale, pick } from "@/content/site";
import { Header, FloatingActions } from "@/components/header";
import { Footer } from "@/components/footer";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;

  return (
    <html
      lang={l}
      data-locale={l}
      data-scroll-behavior="smooth"
      style={
        {
          "--type-body":
            l === "hi"
              ? '"Arya", system-ui, sans-serif'
              : '"IBM Plex Sans", system-ui, sans-serif',
          "--type-title":
            l === "hi" ? '"Arya", serif' : '"Newsreader", Georgia, serif',
          "--type-ui":
            l === "hi"
              ? '"Rajdhani", "Arya", system-ui, sans-serif'
              : '"IBM Plex Sans", system-ui, sans-serif',
          "--type-signature":
            l === "hi"
              ? '"Yatra One", "Arya", serif'
              : '"Newsreader", Georgia, serif',
        } as React.CSSProperties
      }
    >
      <head>
        <link rel="icon" href="/images/brand/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Arya:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&family=Rajdhani:wght@500;600;700&family=Yatra+One&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Arya:wght@400;700&family=Cormorant+Garamond:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Khand:wght@500;600;700&family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&family=Rajdhani:wght@500;600;700&family=Rozha+One&display=swap"
        />
      </head>
      <body className="font-body antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-28 bg-white p-4 text-navy shadow-lg focus:translate-y-0"
        >
          {pick(l, "मुख्य सामग्री पर जाएँ", "Skip to main content")}
        </a>
        <Header locale={l} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={l} />
        <FloatingActions locale={l} />
      </body>
    </html>
  );
}
