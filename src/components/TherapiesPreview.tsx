// src/components/TherapiesPreview.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  THERAPIES,
  CATEGORIES,
  type CategoryFilter,
  therapyImage,
  therapyHref,
} from "@/lib/therapies";

export default function TherapiesPreview() {
  const [cat, setCat] = useState<CategoryFilter>("All");

  const list = useMemo(
    () => (cat === "All" ? THERAPIES : THERAPIES.filter((t) => t.category === cat)),
    [cat]
  );

  return (
    <section id="therapies" className="section">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="h-section">Therapies</h2>
          <p className="mt-2 text-sm text-slate-600 max-w-prose">
            Image-first cards. Filter by category and tap for details.
          </p>
        </div>

        {/* "View all" (always visible) */}
        <Link className="btn btn-outline hidden md:inline-flex" href="/therapies" aria-label="View all therapies">
          View all
        </Link>
      </div>

      {/* Category filter (pills) */}
      <nav
        aria-label="Therapy categories"
        className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <style>{`nav::-webkit-scrollbar{display:none}`}</style>
        {CATEGORIES.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`whitespace-nowrap chip ${active ? "chip-active" : ""}`}
              aria-pressed={active}
            >
              {c}
            </button>
          );
        })}
      </nav>

      {/* Cards grid (compact) */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => {
          const { src, alt } = therapyImage(t);
          return (
            <article
              key={t.slug}
              className="group overflow-hidden rounded-xl bg-white shadow-card transition-transform hover:-translate-y-1"
            >
              <Link
                href={therapyHref(t.slug)}
                aria-label={`View details for ${t.name}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-2)]"
              >
                {/* image (shorter height to keep section compact) */}
                <div className="relative h-32 md:h-36 w-full">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h3 className="text-white text-sm md:text-base font-semibold line-clamp-1">
                      {t.name}
                    </h3>
                  </div>
                </div>
              </Link>

              {/* subtle footer with View details */}
              <div className="flex items-center justify-between p-3">
                <span className="text-xs text-slate-500">{t.category}</span>
                <Link
                  href={therapyHref(t.slug)}
                  className="text-sm font-medium hover:underline"
                  aria-label={`View details for ${t.name}`}
                  style={{ color: "var(--color-brand-1)" }} // deep purple
                >
                  View details →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Mobile "View all" */}
      <div className="mt-6 md:hidden">
        <Link className="btn btn-outline w-full justify-center" href="/therapies" aria-label="View all therapies">
          View all therapies
        </Link>
      </div>
    </section>
  );
}
