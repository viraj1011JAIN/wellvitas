// src/app/(site)/about/who-we-are/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Who We Are | Wellvitas",
};

const values = [
  { title: "Human first", text: "We listen without rushing, explain plainly, and respect your pace.", icon: "💬" },
  { title: "Evidence-aware", text: "We keep up with research and are honest about limits and expectations.", icon: "🔎" },
  { title: "Practical progress", text: "Small wins compound. We plan around your life, not the other way round.", icon: "🌱" },
];

const team = [
  { name: "Alex Carter", role: "Lead Practitioner", bio: "MSK background, blended rehab + device-assisted care.", emoji: "🧑‍⚕️" },
  { name: "Sam Rivera", role: "Therapy Specialist", bio: "Photobiomodulation & PEMF enthusiast; gentle, thorough.", emoji: "✨" },
  { name: "Jas Kaur", role: "Client Coordinator", bio: "Welcomes you in, keeps your plan tidy, always on WhatsApp.", emoji: "📅" },
];

export default function WhoWeArePage() {
  return (
    <article className="space-y-10">
      {/* HERO (unchanged) */}
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
              About us
            </span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Who We Are
            </h1>
            <p className="mt-4 max-w-2xl text-white/90">
              We’re a small, focused team. Different skills, same priority: clear, caring progress.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="btn"
                style={{ backgroundColor: "var(--color-brand-2-40)", color: "#2E0056", border: "1px solid #7E0054" }}
              >
                Book an enquiry
              </Link>
              <Link
                href="/therapies"
                className="btn"
                style={{ backgroundColor: "var(--color-brand-2-40)", color: "#2E0056", border: "1px solid #7E0054" }}
              >
                Explore therapies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values — cards with 40% magenta & #2E0056 border */}
      <section className="section pt-0">
        <div className="grid gap-6 md:grid-cols-3 fade-up" style={{ animationDelay: "80ms" }}>
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054
                border: "1px solid #2E0056",
                boxShadow: "0 10px 28px rgba(126,0,84,.15)",
              }}
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{
                  background: "#ffffff",
                  color: "#2E0056",
                  border: "1px solid #2E0056",
                }}
              >
                <span aria-hidden>{v.icon}</span>
              </div>
              <h3 className="mt-3 font-semibold" style={{ color: "#2E0056" }}>
                {v.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "#2E0056" }}>
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team — cards with 40% magenta & #2E0056 border */}
      <section className="section pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-up" style={{ animationDelay: "160ms" }}>
          {team.map((m) => (
            <div
              key={m.name}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: "var(--color-brand-2-40)", // 40% of #7E0054
                border: "1px solid #2E0056",
                boxShadow: "0 10px 28px rgba(126,0,84,.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 place-items-center rounded-full text-2xl"
                  style={{
                    background: "#ffffff",
                    color: "#2E0056",
                    border: "1px solid #2E0056",
                  }}
                >
                  <span aria-hidden>{m.emoji}</span>
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: "#2E0056" }}>
                    {m.name}
                  </h3>
                  <p className="text-sm" style={{ color: "#2E0056" }}>
                    {m.role}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm" style={{ color: "#2E0056" }}>
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (kept consistent with your brand) */}
      <section className="section pt-0 fade-up" style={{ animationDelay: "220ms", marginBottom: "1.5rem" }}>
        <div
          className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-card"
          style={{ background: "#2E0056", color: "#ffffff" }}
        >
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Say hello</h3>
            <p className="mt-1 text-white/90 text-sm">
              Questions about a programme or a therapy? We’re here.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              href="https://wa.me/447379005856"
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "var(--color-brand-2-40)",
                color: "#2E0056",
                border: "1px solid #7E0054",
              }}
            >
              WhatsApp
            </a>
            <Link
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              href="/booking"
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
      </section>
    </article>
  );
}
