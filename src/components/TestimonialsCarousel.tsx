// src/components/TestimonialsCarousel.tsx
"use client";

import { useEffect, useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  rating?: number; // optional stars
};

type Props = {
  title?: string;
  items: Testimonial[];
};

export default function TestimonialsCarousel({
  title = "Testimonials",
  items,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  // Auto-glide carousel with pause on hover/focus
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const step = () => {
      if (!scroller || isHoveringRef.current) return;
      const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-card]"));
      const currentLeft = scroller.scrollLeft;
      const next =
        cards.find((c) => c.offsetLeft > currentLeft + 10) ?? cards[0];
      scroller.scrollTo({
        left: next.offsetLeft,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    };

    const start = () => {
      if (prefersReduced) return;
      stop();
      timerRef.current = window.setInterval(step, 4500);
    };

    const stop = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    start();

    const onMouseEnter = () => {
      isHoveringRef.current = true;
      stop();
    };
    const onMouseLeave = () => {
      isHoveringRef.current = false;
      start();
    };

    scroller.addEventListener("mouseenter", onMouseEnter);
    scroller.addEventListener("mouseleave", onMouseLeave);

    return () => {
      stop();
      scroller.removeEventListener("mouseenter", onMouseEnter);
      scroller.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-card]"));
    const currentLeft = scroller.scrollLeft;
    const target =
      dir === 1
        ? cards.find((c) => c.offsetLeft > currentLeft + 10) ?? cards[0]
        : [...cards].reverse().find((c) => c.offsetLeft < currentLeft - 10) ??
          cards[cards.length - 1];

    scroller.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  return (
    <section
      aria-label={title}
      className="w-full relative border-t"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, #2E0056 6%, white), color-mix(in srgb, #7E0054 6%, white))",
        borderColor: "color-mix(in srgb, #7E0054 30%, transparent)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E0056]">
            {title}
          </h2>

          {/* Desktop arrows */}
          <div className="hidden md:flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollByCards(-1)}
              className="rounded-2xl px-3 py-2 border text-sm font-semibold shadow-card transition-transform hover:-translate-y-0.5 focus-visible:outline-none"
              style={{
                background: "var(--color-brand-2-40)",
                color: "#2E0056",
                borderColor: "#7E0054",
              }}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollByCards(1)}
              className="rounded-2xl px-3 py-2 border text-sm font-semibold shadow-card transition-transform hover:-translate-y-0.5 focus-visible:outline-none"
              style={{
                background: "var(--color-brand-2-40)",
                color: "#2E0056",
                borderColor: "#7E0054",
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3"
            style={{ scrollbarWidth: "thin" }}
          >
            {items.map((t, i) => (
              <article
                key={i}
                data-card
                className="shrink-0 snap-start rounded-2xl border-2 shadow-sm p-6"
                style={{
                  background: "color-mix(in srgb, #2E0056 8%, white)",
                  borderColor: "#2E0056",
                  width: "88vw",
                  maxWidth: "540px",
                }}
              >
                {/* Full name at top */}
                <div className="text-lg font-bold mb-2" style={{ color: "#2E0056" }}>
                  {t.name}
                </div>
                {t.role ? (
                  <div className="text-sm font-medium opacity-75 mb-3" style={{ color: "#2E0056" }}>
                    {t.role}
                  </div>
                ) : null}

                {/* Quote */}
                <p className="text-base leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="text-2xl align-[-6px] mr-1"
                    style={{ color: "color-mix(in srgb, #2E0056 30%, transparent)" }}
                  >
                    “
                  </span>
                  <span style={{ color: "#7E0054", fontWeight: 600 }}>{t.quote}</span>
                  <span
                    aria-hidden="true"
                    className="text-2xl align-[-6px] ml-1"
                    style={{ color: "color-mix(in srgb, #2E0056 30%, transparent)" }}
                  >
                    ”
                  </span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
