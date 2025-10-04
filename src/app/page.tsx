// src/app/page.tsx
"use client";

import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import HomeTherapies from "@/components/HomeTherapies";
import TreatmentPackagesScroller from "@/components/TreatmentPackagesScroller"; // ⟵ changed

export default function Page() {
  return (
    <main>
      {/* 1) Slideshow */}
      <HeroCarousel />

      {/* 2) Intro */}
      <section className="section">
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-10"
          style={{ backgroundColor: "#2E0056" }}
        >
          <div className="relative z-10">
            <h1 className="mt-1 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Feel better with Wellvitas
            </h1>
            <p className="mt-4 max-w-prose text-white/85">
              Holistic therapies, wellness programmes, and lifestyle support in Glasgow.
            </p>

            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              <Link
                aria-label="Go to booking"
                href="/booking"
                className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
                style={{
                  background: "var(--color-brand-2-40)",
                  color: "#2E0056",
                  borderColor: "#7E0054",
                }}
              >
                Book an enquiry
              </Link>

              <a
                aria-label="Jump to therapies"
                href="#therapies"
                className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
                style={{
                  background: "var(--color-brand-2-40)",
                  color: "#2E0056",
                  borderColor: "#7E0054",
                }}
              >
                View therapies
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Therapies */}
      <section id="therapies" className="section">
        <HomeTherapies />
      </section>

      {/* 3.1) Treatment Packages — scrolling like news/testimonials */}
      <TreatmentPackagesScroller />

      {/* 4) How to book */}
      <section className="section">
        <div
          className="rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-card"
          style={{ backgroundColor: "#2E0056" }}
        >
          <div>
            <h2 className="text-xl font-semibold text-white">How to book</h2>
            <p className="mt-1 text-sm text-white/85">
              Make an enquiry, complete the health screening, enjoy a free taster treatment,
              then start your programme.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
              href="https://wa.me/447379005856"
              target="_blank"
              rel="noreferrer"
              aria-label="Open WhatsApp chat"
              style={{
                background: "var(--color-brand-2-40)",
                color: "#2E0056",
                borderColor: "#7E0054",
              }}
            >
              WhatsApp us
            </a>

            <Link
              className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
              href="/booking"
              aria-label="Open booking form"
              style={{
                background: "var(--color-brand-2-40)",
                color: "#2E0056",
                borderColor: "#7E0054",
              }}
            >
              Booking form
            </Link>
          </div>
        </div>
      </section>

      {/* 5) Visit us */}
      <section className="section">
        <h2 className="text-xl md:text-2xl font-semibold" style={{ color: "var(--color-brand-1)" }}>
          Visit us
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Open 9:00–20:00 · 1626 Great Western Rd, Anniesland, Glasgow G13 1HH
        </p>
        <div className="mt-4 flex gap-3">
          <a
            className="btn btn-outline"
            href="https://maps.google.com/?q=1620+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH"
            target="_blank"
            rel="noreferrer"
            aria-label="Open directions in Google Maps"
          >
            Get directions
          </a>
          <a className="btn btn-outline" href="#footer-map" aria-label="Scroll to the map">
            See map
          </a>
        </div>
      </section>
    </main>
  );
}
