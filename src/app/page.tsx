// src/app/page.tsx
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import HomeTherapies from "@/components/HomeTherapies";

export default function Page() {
  return (
    <main>
      {/* 1) Slideshow */}
      <HeroCarousel />

      {/* 2) Intro (solid #2E0056, white heading, buttons at 40% of #7E0054) */}
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
                className="btn rounded-2xl"
                style={{
                  backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054
                  color: "#2E0056", // button text
                  border: "none",
                }}
              >
                Book an enquiry
              </Link>

              <a
                aria-label="Jump to therapies"
                href="#therapies"
                className="btn rounded-2xl"
                style={{
                  backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054
                  color: "#2E0056", // button text
                  border: "none",
                }}
              >
                View therapies
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Therapies (filterable & compact) */}
      <HomeTherapies />

      {/* 4) How to book — BG #2E0056, white body text, buttons magenta-40 with purple text */}
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
              className="btn rounded-2xl"
              href="https://wa.me/447379005856"
              target="_blank"
              rel="noreferrer"
              aria-label="Open WhatsApp chat"
              style={{
                backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054
                color: "#2E0056", // button text now purple
                border: "none",
              }}
            >
              WhatsApp us
            </a>

            <Link
              className="btn rounded-2xl"
              href="/booking"
              aria-label="Open booking form"
              style={{
                backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054
                color: "#2E0056", // button text now purple
                border: "none",
              }}
            >
              Booking form
            </Link>
          </div>
        </div>
      </section>

      {/* 5) Visit us */}
      <section className="section">
        <h2
          className="text-xl md:text-2xl font-semibold"
          style={{ color: "var(--color-brand-1)" }}
        >
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
