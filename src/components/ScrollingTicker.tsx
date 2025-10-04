// src/components/TestimonialsCarousel.tsx
"use client";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

type Props = {
  title?: string;
  items: Testimonial[];
};

export default function TestimonialsCarousel({ title = "Testimonials", items }: Props) {
  return (
    <section
      aria-label={title}
      className="w-full border-t"
      style={{
        // subtle band behind the carousel
        background:
          "linear-gradient(135deg, color-mix(in srgb, #2E0056 6%, white), color-mix(in srgb, #7E0054 6%, white))",
        borderColor: "color-mix(in srgb, #7E0054 30%, transparent)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h2
          className="text-sm font-semibold tracking-wide mb-3"
          style={{ color: "color-mix(in srgb, #2E0056 70%, white)" }}
        >
          {title}
        </h2>

        {/* Horizontal snap carousel: 1 card per view on mobile, ~2 on md+ */}
        <div
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {items.map((t, i) => (
            <article
              key={i}
              className="shrink-0 snap-start rounded-2xl border-2 shadow-sm p-5"
              style={{
                // soft purple surface for the card
                background: "color-mix(in srgb, #2E0056 8%, white)",
                borderColor: "#2E0056",
                width: "90vw",          // ~1 card visible on mobile
                maxWidth: "520px",      // comfortable reading width
              }}
            >
              <p className="text-base leading-relaxed">
                <span
                  aria-hidden="true"
                  className="text-2xl align-[-6px] mr-1"
                  style={{ color: "color-mix(in srgb, #2E0056 30%, transparent)" }}
                >
                  “
                </span>
                <span style={{ color: "#7E0054", fontWeight: 600 }}>
                  {t.quote}
                </span>
                <span
                  aria-hidden="true"
                  className="text-2xl align-[-6px] ml-1"
                  style={{ color: "color-mix(in srgb, #2E0056 30%, transparent)" }}
                >
                  ”
                </span>
              </p>

              <div className="mt-4">
                <div className="text-sm font-bold" style={{ color: "#2E0056" }}>
                  {t.name}
                </div>
                {t.role ? (
                  <div className="text-xs font-medium opacity-75" style={{ color: "#2E0056" }}>
                    {t.role}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {/* show subtle hint dots on larger screens */}
        <div className="mt-3 hidden md:flex gap-2">
          {items.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "color-mix(in srgb, #2E0056 30%, transparent)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
