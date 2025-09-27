// src/app/booking/page.tsx
import type { Metadata } from "next";
import BookingFlow from "@/components/BookingFlow";
import OpenHoursBadge from "@/components/OpenHoursBadge";

export const metadata: Metadata = {
  title: "Booking | Wellvitas",
  description:
    "Book your free taster and start your wellness programme at Wellvitas, Glasgow.",
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wellvitas Booking",
    areaServed: "Glasgow, Scotland",
    provider: {
      "@type": "LocalBusiness",
      name: "Wellvitas",
      address: "1626 Great Western Rd, Anniesland, Glasgow G13 1HH",
      url: "https://wellvitas.co.uk",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: "https://wellvitas.co.uk/booking",
      result: { "@type": "Reservation", name: "Free Taster Session" },
    },
  };

  return (
    <>
      {/* Intro */}
      <section className="section">
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-10"
          style={{ backgroundColor: "#2E0056" }} // solid brand-1
        >
          <div className="relative z-10">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054 (from your tokens)
                color: "#2E0056",
                border: "1px solid #7E0054",
              }}
            >
              Start here
            </span>

            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Book your free taster
            </h1>

            <p className="mt-3 max-w-2xl" style={{ color: "rgba(255,255,255,.92)" }}>
              Make an enquiry, complete a quick health screening, choose a taster slot, then set up
              your programme.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Help */}
      <section className="section">
        <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
          {/* Left: multi-step flow */}
          <BookingFlow />

          {/* Right: upgraded sticky help card */}
          <aside className="md:sticky md:top-24 h-fit">
            {/* Brand gradient frame */}
            <div
              className="relative rounded-2xl p-[1px]"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-1) 40%, transparent), color-mix(in srgb, var(--color-brand-2) 20%, transparent))",
              }}
            >
              <div className="card p-6">
                {/* Header with dynamic open-hours badge */}
                <div className="flex items-center justify-between gap-3">
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: "var(--color-brand-1)" }}
                  >
                    Need a hand?
                  </h2>
                  <OpenHoursBadge />
                </div>

                {/* Quick actions */}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a className="btn btn-outline" href="tel:+447379005856" aria-label="Call Wellvitas">
                    📞 Call us
                  </a>
                  <a
                    className="btn btn-primary"
                    href="https://wa.me/447379005856"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat on WhatsApp"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    className="btn btn-outline sm:col-span-2"
                    href="mailto:info@wellvitas.co.uk"
                    aria-label="Email Wellvitas"
                  >
                    ✉️ info@wellvitas.co.uk
                  </a>
                </div>

                {/* Info blocks */}
                <div className="mt-5 grid gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="grid h-8 w-8 place-items-center rounded-lg"
                        style={{
                          background: "var(--color-brand-1-20)",
                          color: "var(--color-brand-1)",
                        }}
                      >
                        📍
                      </div>
                      <div className="text-sm text-slate-700">
                        <div className="font-medium">1626 Great Western Rd</div>
                        <div>Anniesland, Glasgow G13 1HH</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="grid h-8 w-8 place-items-center rounded-lg"
                        style={{
                          background: "var(--color-brand-1-20)",
                          color: "var(--color-brand-1)",
                        }}
                      >
                        🕘
                      </div>
                      <div className="text-sm text-slate-700">
                        <div className="font-medium">Opening hours</div>
                        <div>Mon–Sat · 9:00–20:00</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-xl p-4"
                    style={{
                      border: "1px solid color-mix(in srgb, var(--color-brand-1) 30%, white)",
                      background: "color-mix(in srgb, var(--color-brand-1) 6%, white)",
                    }}
                  >
                    <p className="text-sm text-slate-700">
                      <span className="font-medium">What happens next?</span>{" "}
                      We’ll confirm your slot and send any prep notes. You can add it to your
                      calendar and message us anytime.
                    </p>
                  </div>
                </div>

                {/* Mini map */}
                <div className="map-embed mt-5">
                  <iframe
                    title="Wellvitas location"
                    src="https://www.google.com/maps?q=1620+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH&output=embed"
                    width="100%"
                    height="180"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
