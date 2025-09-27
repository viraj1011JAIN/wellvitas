import type { Metadata } from "next";
import AboutNav from "@/components/AboutNav";

export const metadata: Metadata = {
  title: "About Us | Wellvitas",
  description:
    "Learn about Wellvitas: our story, our causes, and the people behind our care.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Brand hero */}
      <section className="section">
        <div className="brand-hero p-8 md:p-12">
          <div className="brand-dots absolute inset-0 rounded-2xl" />
          <div className="relative z-10">
            <span className="badge bg-white/80 text-brand-teal">About Wellvitas</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-brand-purple">
              Care, science, and genuine human warmth
            </h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              We’re a Glasgow clinic blending evidence-led modalities with compassionate support.
              Discover our story, the causes we back, and the team behind the work.
            </p>
          </div>
        </div>
      </section>

      {/* Subnav */}
      <AboutNav />

      {/* Page content */}
      <div className="section">{children}</div>
    </>
  );
}
