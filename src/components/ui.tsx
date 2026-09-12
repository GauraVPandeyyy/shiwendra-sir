import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type Locale, pick } from "@/content/site";
export const wrap = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-16";
export function Action({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-between gap-8 border-b py-3 text-base font-semibold transition-colors ${light ? "border-white/40 text-white hover:border-gold" : "border-navy/30 text-navy hover:border-blue"}`}
    >
      {children}
      <ArrowUpRight
        size={20}
        className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </Link>
  );
}
export function Heading({
  kicker,
  title,
  body,
  light = false,
}: {
  kicker: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[.13em] ${light ? "text-white/75" : "text-blue"}`}
      >
        <span className="h-px w-10 bg-gold" />
        {kicker}
      </p>
      <h2
        className={`font-display text-4xl leading-[1.3] sm:text-5xl lg:text-6xl ${light ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${light ? "text-white/80" : "text-ink/75"}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-navy/10 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, 65vw"
        priority={priority}
        className="object-cover transition-transform duration-700 motion-safe:hover:scale-[1.035]"
      />
    </div>
  );
}
export function PageHero({
  locale,
  kicker,
  title,
  body,
  image,
}: {
  locale: Locale;
  kicker: string;
  title: string;
  body: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_35%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/75 to-navy/10" />
      </div>
      <div className={`${wrap} relative py-16 sm:py-24 lg:py-32`}>
        <Link
          href={`/${locale}`}
          className="mb-12 inline-block text-sm text-white/80 hover:text-white"
        >
          {pick(locale, "मुख्य पृष्ठ", "Home")} / {kicker}
        </Link>
        <p className="mb-5 text-sm tracking-widest text-white/80">{kicker}</p>
        <h1 className="max-w-3xl font-display text-5xl leading-[1.25] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
          {body}
        </p>
      </div>
    </section>
  );
}
