// src/app/(site)/about/our-story/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story | Wellvitas",
  description:
    "How Wellvitas began, what shaped our approach, and the principles that guide our care.",
};

export default function OurStoryPage() {
  return (
    <main>
      {/* =========================
          HERO — #2E0056 bg, white text, buttons 40% #7E0054 w/ #2E0056 text
         ========================= */}
      <section className="section">
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-12"
          style={{ backgroundColor: "#2E0056" }}
        >
          <div className="relative z-10">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "var(--color-brand-2-40)", color: "#2E0056" }}
            >
              About · Our Story
            </span>

            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              From a small pilot to a modern wellness studio
            </h1>

            <p className="mt-4 max-w-2xl text-white/90">
              We started with one room and a simple promise: care that’s personal, practical and
              evidence-aware. Step by step, the community helped shape what Wellvitas is today.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="/about"
                className="btn"
                style={{
                  backgroundColor: "var(--color-brand-2-40)",
                  color: "#2E0056",
                  border: "1px solid #7E0054",
                }}
              >
                Back to About
              </Link>
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
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          TIMELINE (unchanged layout / brand text)
         ========================= */}
      <section className="section">
        <h2 className="h-section" style={{ color: "var(--color-brand-1)" }}>
          Milestones
        </h2>
        <ol className="mt-6 relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-200" aria-hidden />
          {[
            {
              year: "2019",
              title: "Listening first",
              body:
                "We ran small, appointment-only sessions focused on listening and practical guidance. We learned what people needed most.",
            },
            {
              year: "2020–21",
              title: "Refining the toolkit",
              body:
                "We introduced light-based therapies, PEMF and gentle physiotherapy protocols, tracking outcomes and simplifying programmes.",
            },
            {
              year: "2022",
              title: "Opening our studio",
              body:
                "We moved to Anniesland with calmer spaces, clear pathways, and easy booking—still centred on relationship-led care.",
            },
            {
              year: "Today",
              title: "Programmes that fit real life",
              body:
                "From hyperbaric oxygen to movement rehab, we combine modalities with pacing and education so results actually stick.",
            },
          ].map((i, idx) => (
            <li
              key={i.title}
              className="relative mb-6 fade-up"
              style={{ animationDelay: `${idx * 80}ms` } as React.CSSProperties}
            >
              <div
                className="absolute -left-1 top-1.5 h-3 w-3 rounded-full"
                style={{ background: "var(--color-brand-2)" }}
              />
              <div className="card p-5">
                <div className="text-xs text-slate-500">{i.year}</div>
                <h3 className="mt-1 font-semibold" style={{ color: "var(--color-brand-1)" }}>
                  {i.title}
                </h3>
                <p className="mt-1 text-sm text-slate-700">{i.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* =========================
          PULL QUOTE — bg 40% of #7E0054, text #2E0056
         ========================= */}
      <section className="section-narrow">
        <figure
          className="p-6 text-center rounded-2xl shadow-card"
          style={{ backgroundColor: "var(--color-brand-2-40)" }}
        >
          <blockquote className="text-xl md:text-2xl font-semibold" style={{ color: "#2E0056" }}>
            “Care should feel clear and kind. You’ll always leave knowing what we’re doing and why.”
          </blockquote>
          <figcaption className="mt-2 text-sm" style={{ color: "#2E0056" }}>
            — The Wellvitas ethos
          </figcaption>
        </figure>
      </section>

      {/* =========================
          CTA — #2E0056 bg, white text,
          buttons 40% #7E0054 w/ #2E0056 text
         ========================= */}
      <section className="section">
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-8 shadow-card fade-up"
          style={{ backgroundColor: "#2E0056", color: "#ffffff" }}
        >
          <h2 className="text-2xl font-semibold">See how we can help, today</h2>
          <p className="mt-2 max-w-prose" style={{ color: "rgba(255,255,255,0.9)" }}>
            Start with a friendly chat and a quick screening. We’ll design a step-by-step plan that
            fits your life.
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
    </main>
  );
}
