"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroSlide from "./HeroSlide";
import { heroSlides } from "./heroData";
import type { Locale } from "@/content/site";

export default function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="hero-section relative h-[90svh] min-h-[380px] w-full max-w-full overflow-hidden bg-[#f8f5ef] md:min-h-[550px]">
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard, Navigation, Pagination, A11y]}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={heroSlides.length > 1}
        speed={850}
        allowTouchMove
        grabCursor
        simulateTouch
        threshold={5}
        shortSwipes
        longSwipes
        followFinger
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
        }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        pagination={{
          el: ".hero-pagination",
          clickable: true,
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        watchSlidesProgress
        observer
        observeParents
        className="hero-swiper h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <HeroSlide slide={slide} isActive={isActive} locale={locale} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-40 flex items-center justify-center gap-3 md:bottom-7">
        <button
          type="button"
          className="hero-prev pointer-events-auto hidden h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white/88 text-navy shadow-lg backdrop-blur-xl transition hover:bg-white md:grid"
          aria-label={locale === "hi" ? "पिछली स्लाइड" : "Previous slide"}
        >
          <ChevronLeft size={19} />
        </button>
        <div className="pointer-events-auto rounded-full border border-navy/12 bg-white/82 px-4 py-2.5 shadow-lg backdrop-blur-xl">
          <div className="hero-pagination" />
        </div>
        <button
          type="button"
          className="hero-next pointer-events-auto hidden h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white/88 text-navy shadow-lg backdrop-blur-xl transition hover:bg-white md:grid"
          aria-label={locale === "hi" ? "अगली स्लाइड" : "Next slide"}
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </section>
  );
}
