// src/app/(site)/about/our-causes/page.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Causes | Wellvitas",
  description:
    "Causes we support through community care, education, and responsible practice.",
};

const causes = [
  {
    title: "Community access",
    text:
      "We provide reduced-fee slots and partner with local groups to support those who need care most.",
    icon: "🤝",
  },
  {
    title: "Education & prevention",
    text:
      "Talks and simple resources that help people manage pain, pace activity, and recover smarter.",
    icon: "🎓",
  },
  {
    title: "Responsible tech",
    text:
      "We favour safe, non-invasive modalities and share limits as clearly as potential benefits.",
    icon: "🧭",
  },
];

export default function OurCausesPage(): ReactNode {
  return (
    <article className="space-y-10">
      {/* HERO BAND */}
      <div className="h-6" />
      <section className="fade-up">
        <div
          className="rounded-2xl p-6 md:p-10 shadow-card"
          style={{
            backgroundColor: "#2E0056",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(600px 260px at 18% 22%, rgba(255,255,255,.12), transparent 60%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              className="inline-block text-xs font-semibold rounded-full px-3 py-1"
              style={{
                backgroundColor: "var(--color-brand-2-40)",
                color: "#2E0056",
              }}
            >
              About · Our Causes
            </span>
            <h2
              className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white"
            >
              Causes we support, consistently and transparently
            </h2>
            <p
              className="mt-3 max-w-prose"
              style={{ color: "rgba(255,255,255,.90)" }}
            >
              Your visits enable community slots, education, and responsible
              practice. Here’s where that energy goes.
            </p>
          </div>
        </div>
      </section>

      {/* CAUSES GRID */}
      <section
        className="grid gap-6 md:grid-cols-3 fade-up"
        style={{ animationDelay: "80ms" }}
      >
        {causes.map((c) => (
          <div
            key={c.title}
            className="hover-lift"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-1), var(--color-brand-2))",
              borderRadius: "1rem",
              padding: "1px",
            }}
          >
            <div
              className="h-full rounded-[0.95rem] p-6"
              style={{
                background: "#ffffff",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
              }}
            >
              {/* Icon */}
              <div
                className="grid h-12 w-12 place-items-center rounded-xl"
                style={{
                  backgroundColor: "var(--color-brand-2-40)",
                  color: "var(--color-brand-2)",
                  boxShadow: "0 6px 16px rgba(126,0,84,.18)",
                }}
              >
                <span aria-hidden style={{ fontSize: 22 }}>
                  {c.icon}
                </span>
              </div>

              <h3
                className="mt-4 font-semibold"
                style={{
                  color: "var(--color-brand-1)",
                  fontSize: "1.125rem",
                }}
              >
                {c.title}
              </h3>

              <p className="mt-2 text-sm" style={{ color: "#334155" }}>
                {c.text}
              </p>

              <div className="mt-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold"
                  style={{
                    backgroundColor: "var(--color-brand-2-40)",
                    color: "#2E0056",
                    border: "1px solid #7E0054",
                  }}
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* STATS */}
      <section
        className="grid gap-3 sm:grid-cols-3 fade-up"
        style={{ animationDelay: "160ms" }}
      >
        {[
          { k: "£1 in £20", v: "Set aside for community access" },
          { k: "12+", v: "Talks/workshops hosted" },
          { k: "0", v: "Hard sells (ever)" },
        ].map((s) => (
          <div
            key={s.k}
            className="text-center rounded-2xl p-5"
            style={{
              backgroundColor: "var(--color-brand-2-40)",
              color: "#2E0056",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
              border: "1px solid #7E0054",
            }}
          >
            <div className="text-3xl font-bold">{s.k}</div>
            <div
              className="mt-1 text-sm"
              style={{ color: "#2E0056", opacity: 0.9 }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="fade-up" style={{ animationDelay: "220ms" }}>
        <div
          className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-card"
          style={{
            backgroundColor: "#2E0056",
            color: "#ffffff",
          }}
        >
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Want to partner on a cause?
            </h3>
            <p
              className="mt-1 text-sm"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              We’re open to local collaborations that align with our values.
            </p>
          </div>

          <a
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
            href="mailto:info@wellvitas.co.uk"
            style={{
              backgroundColor: "var(--color-brand-2-40)",
              color: "#2E0056",
              border: "1px solid #7E0054",
            }}
          >
            Email us
          </a>
        </div>
      </section>

      <div className="h-6" />
    </article>
  );
}
