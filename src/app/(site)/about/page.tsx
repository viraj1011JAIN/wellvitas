// src/app/(site)/about/page.tsx
import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Wellvitas | Our Story, Causes & Team",
  description:
    "Wellvitas is a Glasgow-based wellness studio offering holistic therapies, programmes, and lifestyle support. Meet our team and learn what we stand for.",
};

export default function AboutPage() {
  const site = {
    name: "Wellvitas",
    addressOneLine: "1620 Great Western Rd, Anniesland, Glasgow G13 1HH",
    email: "info@wellvitas.co.uk",
    phone: "+44 7379 005856",
    hours: "Open 9:00–20:00",
    mapQuery: "1620+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1620 Great Western Rd",
      addressLocality: "Glasgow",
      postalCode: "G13 1HH",
      addressRegion: "Scotland",
      addressCountry: "GB",
    },
    openingHours: "Mo-Su 09:00-20:00",
    url: "https://wellvitas.co.uk/about",
  };

  const tiles = [
    {
      href: "/about/our-story",
      title: "Our Story",
      desc:
        "From a tiny pilot to a modern clinic—how we got here and what shaped our approach.",
      icon: "📖",
    },
    {
      href: "/about/our-causes",
      title: "Our Causes",
      desc:
        "The community initiatives and responsible practice we support—consistently and transparently.",
      icon: "💚",
    },
    {
      href: "/about/who-we-are",
      title: "Who We Are",
      desc:
        "Meet the people behind Wellvitas and the values that guide our care.",
      icon: "👥",
    },
  ];

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        suppressHydrationWarning
      />

      {/* HERO — bg #2E0056, buttons 40% of #7E0054 with text #2E0056 */}
      <section className="section">
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-12"
          style={{ backgroundColor: "#2E0056" }}
        >
          <div className="relative z-10">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-brand-2-40)",
                color: "#2E0056",
              }}
            >
              About us
            </span>

            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Care that’s personal, practical, and evidence-aware
            </h1>

            <p className="mt-4 max-w-2xl text-white/90">
              We blend gentle, tech-assisted therapies with clear explanations and a human,
              judgement-free approach. Explore our story, the causes we support, and the people
              behind the work.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="btn"
                style={{
                  backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054
                  color: "#2E0056",
                  border: "1px solid #7E0054",
                }}
              >
                Book an enquiry
              </Link>
              <Link
                href="/therapies"
                className="btn"
                style={{
                  backgroundColor: "var(--color-brand-2-40)",
                  color: "#2E0056",
                  border: "1px solid #7E0054",
                }}
              >
                Explore therapies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS TO SUBPAGES */}
      <section className="section">
        <h2 className="h-section">Explore the About section</h2>
        <p className="mt-2 max-w-prose text-sm text-slate-600">
          Three short reads that explain where we came from, what we stand for, and who you’ll meet.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {tiles.map((t, i) => (
            <div
              key={t.href}
              className="hover-lift fade-up rounded-2xl p-6"
              style={{
                animationDelay: `${i * 80}ms`,
                backgroundColor: "var(--color-brand-2-40)",
              } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-lg"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", color: "#2E0056" }}
                >
                  <span aria-hidden>{t.icon}</span>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "#2E0056" }}>
                  {t.title}
                </h3>
              </div>

              <p className="mt-2 text-sm" style={{ color: "#2E0056" }}>
                {t.desc}
              </p>

              <div className="mt-4">
                <Link
                  href={t.href}
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold"
                  style={{ backgroundColor: "#7E0054", color: "#ffffff" }}
                  aria-label={`Read more about ${t.title}`}
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* VISIT STRIP — “Book an enquiry” button 40% of #7E0054 */}
<section className="section">
  <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 fade-up">
    <div>
      <h2
        className="text-lg md:text-xl font-semibold"
        style={{ color: "var(--color-brand-1)" }}
      >
        Visit our studio
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Open 9:00–20:00 · 1620 Great Western Rd, Anniesland, Glasgow G13 1HH
      </p>
    </div>
    <div className="flex gap-3">
      <a
        className="btn btn-outline"
        href={`https://maps.google.com/?q=1620+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH`}
        target="_blank"
        rel="noreferrer"
      >
        Get directions
      </a>

      {/* IMPORTANT: no 'btn-primary'; kill any background-image */}
      <Link
        href="/booking"
        className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold"
        style={{
          backgroundColor: "var(--color-brand-2-40)",   // 40% of #7E0054
          color: "#2E0056",                              // text in #2E0056
          border: "1px solid #7E0054",
          backgroundImage: "none",                       // <-- ensure no gradient
        }}
      >
        Book an enquiry
      </Link>
    </div>
  </div>
</section>



      {/* CTA BAND — bg #2E0056, BOTH buttons 40% of #7E0054 */}
      <section className="section">
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-8 shadow-card fade-up"
          style={{ backgroundColor: "#2E0056", color: "#ffffff" }}
        >
          <h2 className="text-2xl font-semibold">Ready to feel better?</h2>
          <p className="mt-2 max-w-prose" style={{ color: "rgba(255,255,255,0.9)" }}>
            Start with a friendly chat and a quick screening. We’ll recommend a step-by-step plan that fits your life.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/booking"
              className="btn"
              style={{
                backgroundColor: "var(--color-brand-2-40)",
                color: "#2E0056",
                border: "1px solid #7E0054",
              }}
            >
              Book an enquiry
            </Link>
            <Link
              href="/therapies"
              className="btn"
              style={{
                backgroundColor: "var(--color-brand-2-40)",
                color: "#2E0056",
                border: "1px solid #7E0054",
              }}
            >
              See therapies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
