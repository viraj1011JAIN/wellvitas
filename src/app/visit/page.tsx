// src/app/(site)/visit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visit Us | Wellvitas",
  description:
    "Find our clinic, opening hours, contact options, and travel details. Plan your visit to Wellvitas in Anniesland, Glasgow.",
};

export default function Page() {
  // Structured data for local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Wellvitas",
    url: "https://wellvitas.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1626 Great Western Rd",
      addressLocality: "Anniesland",
      addressRegion: "Glasgow",
      postalCode: "G13 1HH",
      addressCountry: "GB",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    telephone: "+447379005856",
    sameAs: ["https://wa.me/447379005856"],
  };

  // Reusable style helpers (stay on-brand everywhere)
  const btn40Brand2 = {
    backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054
    color: "#2E0056",
    border: "1px solid #7E0054",
  } as React.CSSProperties;

  const headingBrand = { color: "var(--color-brand-1)" } as React.CSSProperties;

  return (
    <>
      {/* HERO — bold, premium, and unmistakably on-brand */}
      <section className="section">
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-12 shadow-card"
          style={{
            backgroundColor: "#2E0056",
            color: "#ffffff",
          }}
        >
          {/* Soft brand aurora */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-20"
            style={{
              background:
                "radial-gradient(800px 360px at 18% 22%, rgba(255,255,255,.30), transparent 65%)",
            }}
          />
          <div className="relative z-10">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={btn40Brand2}
            >
              Plan your visit
            </span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Visit Us
            </h1>
            <p className="mt-4 max-w-2xl text-white/90">
              Find our address, opening hours, and the best ways to get here.
              If you need any assistance, just get in touch—we’ll help you plan
              the easiest route.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn"
                href="https://maps.google.com/?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH"
                target="_blank"
                rel="noreferrer"
                aria-label="Open directions in Google Maps"
                style={btn40Brand2}
              >
                Get directions
              </a>
              {/* UPDATED: make this identical style */}
  <Link
    href="/booking"
    className="btn"
    aria-label="Book a visit"
    style={btn40Brand2} // same designer button
  >
    Book a visit
  </Link>
</div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS STRIP — compact helpers people love */}
      <section className="section">
        <div
          className="rounded-2xl p-4 md:p-5 grid gap-3 md:grid-cols-4 shadow-card"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-1) 10%, white), color-mix(in srgb, var(--color-brand-2) 8%, white))",
          }}
        >
          {[
            {
              icon: "📍",
              title: "Open Maps",
              href:
                "https://maps.google.com/?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH",
            },
            {
              icon: "💬",
              title: "WhatsApp us",
              href: "https://wa.me/447379005856",
            },
            { icon: "📞", title: "+44 7379 005856", href: "tel:+447379005856" },
            { icon: "✉️", title: "info@wellvitas.co.uk", href: "mailto:info@wellvitas.co.uk" },
          ].map((a) => (
            <a
              key={a.title}
              className="card p-4 flex items-center gap-3 hover-lift"
              href={a.href}
              target={a.href.startsWith("http") ? "_blank" : undefined}
              rel={a.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={a.title}
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-lg text-xl"
                style={{
                  background: "var(--color-brand-1-20)",
                  color: "var(--color-brand-1)",
                }}
              >
                {a.icon}
              </div>
              <div className="font-medium" style={headingBrand}>
                {a.title}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* INFO GRID — address / hours / contact */}
      <section className="section">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Address */}
          <div className="card p-6 hover-lift">
            <h2 className="text-lg font-semibold" style={headingBrand}>
              Address
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              1626 Great Western Rd
              <br />
              Anniesland, Glasgow G13 1HH
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="btn"
                href="https://maps.google.com/?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH"
                target="_blank"
                rel="noreferrer"
                style={btn40Brand2}
              >
                Google Maps
              </a>
              <a
                className="btn btn-outline"
                href="https://maps.apple.com/?address=1626%20Great%20Western%20Rd,%20Glasgow%20G13%201HH"
                target="_blank"
                rel="noreferrer"
              >
                Apple Maps
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="card p-6 hover-lift">
            <h2 className="text-lg font-semibold" style={headingBrand}>
              Opening hours
            </h2>
            <ul className="mt-3 text-sm text-slate-700 space-y-1">
              <li>
                Mon – Sat: <span className="font-medium">09:00–20:00</span>
              </li>
              <li>
                Sunday: <span className="text-slate-500">Closed</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Bank holidays may differ — message us to confirm availability.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                className="btn"
                href="https://wa.me/447379005856"
                target="_blank"
                rel="noreferrer"
                style={btn40Brand2}
              >
                Check a time
              </a>
              <Link href="/booking" className="btn btn-outline">
                Book now
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="card p-6 hover-lift">
            <h2 className="text-lg font-semibold" style={headingBrand}>
              Contact
            </h2>
            <ul className="mt-3 text-sm text-slate-700 space-y-2">
              <li>
                📞{" "}
                <a className="link" href="tel:+447379005856">
                  +44 7379 005856
                </a>
              </li>
              <li>
                💬{" "}
                <a
                  className="link"
                  href="https://wa.me/447379005856"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp chat
                </a>
              </li>
              <li>
                ✉️{" "}
                <a className="link" href="mailto:info@wellvitas.co.uk">
                  info@wellvitas.co.uk
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <Link href="/booking" className="btn btn-outline">
                Booking form
              </Link>
              <a
                className="btn"
                href="mailto:info@wellvitas.co.uk"
                style={btn40Brand2}
              >
                Email us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL / ACCESS — beautiful, helpful panels */}
      <section className="section">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Getting here */}
          <div className="card p-6 hover-lift">
            <div className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{
                  background: "var(--color-brand-1-20)",
                  color: "var(--color-brand-1)",
                }}
              >
                🚗
              </div>
              <h2 className="text-lg font-semibold" style={headingBrand}>
                Getting here
              </h2>
            </div>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              <li>
                <span className="font-medium">By car:</span> Use the address
                above in your sat-nav. Nearby street parking is available; check
                local signs.
              </li>
              <li>
                <span className="font-medium">By train/bus:</span> We’re well
                connected locally. Unsure of the best route? Message us and we’ll
                help you plan it.
              </li>
              <li>
                <span className="font-medium">Cycling:</span> You can lock your
                bike close by—please bring a lock.
              </li>
            </ul>
          </div>

          {/* Accessibility */}
          <div className="card p-6 hover-lift">
            <div className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{
                  background: "var(--color-brand-1-20)",
                  color: "var(--color-brand-1)",
                }}
              >
                ♿
              </div>
              <h2 className="text-lg font-semibold" style={headingBrand}>
                Accessibility
              </h2>
            </div>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              <li>We aim to make visits comfortable for everyone.</li>
              <li>
                Let us know in advance if you have specific access needs and
                we’ll assist.
              </li>
              <li>Quiet appointment times available on request.</li>
            </ul>
          </div>

          {/* Parking & tips */}
          <div className="card p-6 hover-lift">
            <div className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{
                  background: "var(--color-brand-1-20)",
                  color: "var(--color-brand-1)",
                }}
              >
                🅿️
              </div>
              <h2 className="text-lg font-semibold" style={headingBrand}>
                Parking & tips
              </h2>
            </div>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              <li>Street parking nearby (restrictions vary by time).</li>
              <li>Arrive 5–10 minutes early for your first visit.</li>
              <li>
                If you’re running late, just WhatsApp or call and we’ll adjust
                where possible.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ — ultra-light accordion using <details> */}
      <section className="section">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            {
              q: "Do you have step-free access?",
              a: "We can accommodate most mobility needs—message us in advance so we can help.",
            },
            {
              q: "Can I bring someone with me?",
              a: "Yes—friends or family are welcome. Let us know if you’d like them in the room.",
            },
            {
              q: "Is there somewhere to wait?",
              a: "Yes, there’s a calm waiting area. We keep it quiet and comfortable.",
            },
            {
              q: "What if I’m early or late?",
              a: "No problem—message us. We’ll do our best to adjust your slot or get you settled.",
            },
          ].map((item) => (
            <details key={item.q} className="card p-5 hover-lift">
              <summary
                className="cursor-pointer font-medium"
                style={headingBrand}
              >
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* MAP — premium card with actions */}
      <section className="section" id="map">
        <div className="card p-0 overflow-hidden hover-lift">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <iframe
                title="Wellvitas on Google Maps"
                src="https://www.google.com/maps?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH&output=embed"
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
            <div className="md:w-1/3 p-6">
              <h3 className="font-semibold" style={headingBrand}>
                Find us
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                1626 Great Western Rd, Anniesland, Glasgow G13 1HH
              </p>
              <div className="mt-4 grid gap-2">
                <a
                  className="btn"
                  href="https://maps.google.com/?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH"
                  target="_blank"
                  rel="noreferrer"
                  style={btn40Brand2}
                >
                  Open Google Maps
                </a>
                <a
                  className="btn btn-outline"
                  href="https://maps.apple.com/?address=1626%20Great%20Western%20Rd,%20Glasgow%20G13%201HH"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Apple Maps
                </a>
                <Link className="btn btn-outline" href="/booking">
                  Book a visit
                </Link>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Accurate to best public data. Routes and travel times may vary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
