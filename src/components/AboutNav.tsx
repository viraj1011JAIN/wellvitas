"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/about/our-story", label: "Our Story", icon: "📖" },
  { href: "/about/our-causes", label: "Our Causes", icon: "💚" },
  { href: "/about/who-we-are", label: "Who We Are", icon: "👥" },
];

export default function AboutNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="About sub-navigation"
      className="sticky top-16 z-40 mt-6"
    >
      <div className="container">
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "chip hover-lift px-3 py-2 text-sm",
                    active ? "bg-white text-brand-teal border-brand-teal/50" : "bg-white/80",
                  ].join(" ")}
                >
                  <span className="mr-1" aria-hidden>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
