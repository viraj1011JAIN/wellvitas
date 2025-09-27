"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export default function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-14 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex flex-wrap gap-2 py-3">
        {items.map((i) => (
          <Link
            key={i.id}
            href={`#${i.id}`}
            className={`rounded-full px-3 py-1 text-sm border transition ${
              active === i.id
                ? "bg-brand-teal text-white border-brand-teal"
                : "bg-white hover:bg-slate-50 border-slate-200"
            }`}
          >
            {i.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
