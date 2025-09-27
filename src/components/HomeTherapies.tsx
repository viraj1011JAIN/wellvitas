// src/components/HomeTherapies.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  THERAPIES,
  CATEGORIES,
  type CategoryFilter,
  therapyImage,
} from "@/lib/therapies";

export default function HomeTherapies() {
  const [category, setCategory] = useState<CategoryFilter>("All");

  const items = useMemo(() => {
    if (category === "All") return THERAPIES;
    return THERAPIES.filter((t) => t.category === category);
  }, [category]);

  const showingAll = category === "All";

  return (
    <section id="therapies" className="section">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="h-section">Therapies</h2>
          <p className="mt-1 text-sm text-slate-600">
            Browse by category and tap any card for details.
          </p>
        </div>

        {/* Category filter (pills) */}
        <div className="mt-2 overflow-x-auto">
          <div className="flex gap-2 pb-1">
            {CATEGORIES.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`whitespace-nowrap chip ${active ? "chip-active" : ""}`}
                  aria-pressed={active}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div
        className={
          showingAll
            ? "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {items.map((t) => {
          const { src, alt } = therapyImage(t);
          return (
            <Link
              key={t.slug}
              href={`/therapies#${t.slug}`}
              className={[
                "group overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-slate-100 transition-transform",
                "hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-2)]",
              ].join(" ")}
              aria-label={`View details for ${t.name}`}
            >
              {/* Image */}
              <div
                className={[
                  "relative w-full",
                  showingAll ? "h-28 md:h-32" : "h-36 md:h-44",
                ].join(" ")}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                  <h3 className="text-white text-sm md:text-base font-semibold line-clamp-1 drop-shadow">
                    {t.name}
                  </h3>
                </div>
              </div>

              {/* Footer */}
              <div
                className={[
                  "flex items-center justify-between",
                  showingAll ? "p-2.5" : "p-3",
                ].join(" ")}
              >
                <span className="text-xs text-slate-500">{t.category}</span>
                <span
                  className="text-[13px] font-medium group-hover:underline"
                  style={{ color: "var(--color-brand-1)" }} // deep purple
                >
                  View details →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View all */}
      <div className="mt-6">
        <Link className="btn btn-outline" href="/therapies">
          View all therapies
        </Link>
      </div>
    </section>
  );
}
