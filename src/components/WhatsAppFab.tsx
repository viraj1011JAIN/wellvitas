// src/components/WhatsAppFab.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const LS_KEY = "wellvitas_booking_v1"; // same as BookingFlow

export default function WhatsAppFab() {
  const pathname = usePathname();

  // Hide on booking page (already lots of CTAs there)
  const hidden = pathname?.startsWith("/booking");

  const [prefill, setPrefill] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const v = JSON.parse(raw);
        const parts = [
          `Hello Wellvitas—I'd like to book.`,
          v?.enquiry?.name ? `Name: ${v.enquiry.name}` : "",
          v?.enquiry?.email ? `Email: ${v.enquiry.email}` : "",
          v?.enquiry?.phone ? `Phone: ${v.enquiry.phone}` : "",
          v?.enquiry?.preferredContact ? `Contact: ${v.enquiry.preferredContact}` : "",
          v?.enquiry?.therapies?.length ? `Therapies: ${v.enquiry.therapies.join(", ")}` : "",
          v?.screening?.conditions?.length ? `Conditions: ${v.screening.conditions.join(", ")}` : "",
          v?.taster?.date ? `Taster: ${v.taster.date} ${v.taster.time || ""}` : "",
        ].filter(Boolean);
        setPrefill(encodeURIComponent(parts.join("\n")));
      }
    } catch {
      // ignore
    }
  }, []);

  const href = useMemo(() => {
    const base = "https://wa.me/447966096721";
    return prefill ? `${base}?text=${prefill}` : base;
  }, [prefill]);

  if (hidden) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed z-50 grid h-12 w-12 place-items-center rounded-full text-white shadow-card
        focus-visible:outline-none focus-visible:ring-2
      "
      style={{
        right: "calc(1rem + env(safe-area-inset-right))",
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
        background: "var(--color-brand-2)", // magenta
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--color-brand-1)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--color-brand-2)")}
      // brand focus ring
      onFocus={(e) => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-brand-2) 35%, transparent)")}
      onBlur={(e) => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "")}
    >
      {/* WhatsApp glyph (inline SVG for crispness) */}
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 3C9.37 3 4 8.37 4 15a11.9 11.9 0 0 0 1.68 6L4 29l8.19-1.58A12 12 0 1 0 16 3Zm0 2a10 10 0 0 1 8.47 15.5l.49.8l-.5.3A10 10 0 0 1 12.3 26l-.3-.17l-.34.06L6.4 27.2l1.42-5.22l.09-.33l-.18-.3A10 10 0 0 1 16 5Zm5.6 13.91c-.23-.11-1.35-.67-1.56-.74c-.21-.08-.36-.11-.52.1s-.6.74-.74.9s-.27.17-.5.06a8.4 8.4 0 0 1-2.49-1.54a9.25 9.25 0 0 1-1.7-2.1c-.18-.31 0-.47.14-.64l.35-.41c.11-.14.18-.23.25-.39s.04-.3 0-.41c-.06-.12-.52-1.25-.72-1.72s-.38-.4-.52-.41h-.45c-.14 0-.41.06-.63.29s-.83.82-.83 2s.86 2.32 1 .5c.12.29 1.62 3.08 3.93 4.33c2.31 1.26 2.31.84 2.73.8c.42-.04 1.35-.55 1.54-1.08c.19-.53.19-.98.13-1.08s-.21-.17-.44-.28Z"
        />
      </svg>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
