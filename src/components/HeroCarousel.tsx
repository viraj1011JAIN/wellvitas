// src/components/HeroCarousel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Slide = {
  src: string;
  title?: string;
  href?: string;
  alt?: string;
};

const defaultSlides: Slide[] = [
  { src: "/hero/slide1.jpg", title: "Grand opening in Anniesland", href: "/about", alt: "Clinic exterior in Glasgow" },
  { src: "/hero/slide2.jpg", title: "Free taster treatment this month", href: "/booking", alt: "Treatment room with calming decor" },
  { src: "/hero/slide3.jpg", title: "Now offering Hyperbaric Oxygen Therapy", href: "/therapies#hyperbaric-oxygen-therapy", alt: "Hyperbaric chamber" },
];

export default function HeroCarousel({ slides = defaultSlides }: { slides?: Slide[] }) {
  const [i, setI] = useState(0);
  const len = slides.length;
  const regionRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const prev = () => setI((v) => (v - 1 + len) % len);
  const next = () => setI((v) => (v + 1) % len);

  // Keyboard control
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [len]);

  // Auto-advance (respects reduced motion)
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);

  return (
    <section className="section pt-0">
      <div
        ref={regionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Homepage highlights"
        tabIndex={0}
        className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-slate-100"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocus={() => (pausedRef.current = true)}
        onBlur={() => (pausedRef.current = false)}
      >
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i === idx ? "false" : "true"}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.30), rgba(0,0,0,0.30)), url('${s.src}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {s.title && (
              <div className="absolute bottom-5 left-5 right-5 md:left-8 md:bottom-8">
                <h2 className="max-w-3xl text-white text-2xl md:text-4xl font-bold drop-shadow">
                  {s.href ? <Link href={s.href}>{s.title}</Link> : s.title}
                </h2>
              </div>
            )}
            {s.alt && <span className="sr-only">{s.alt}</span>}
          </div>
        ))}

        {/* arrows — brand colors */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-xl backdrop-blur hover:bg-white shadow-card
                     text-[color:var(--color-brand-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-2)]"
        >
          &#8249;
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-xl backdrop-blur hover:bg-white shadow-card
                     text-[color:var(--color-brand-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-2)]"
        >
          &#8250;
        </button>

        {/* dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full transition ${i === idx ? "bg-white" : "bg-white/60 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
