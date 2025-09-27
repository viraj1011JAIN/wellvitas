"use client";

import { useEffect, useState } from "react";

/**
 * Simple “Open now” badge for Mon–Sat, 09:00–20:00 Europe/London.
 * Shows "Closed" on Sundays or outside hours.
 * Uses brand colors from globals.css (brand-1 / brand-2).
 */
export default function OpenHoursBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tz = "Europe/London";
    const now = new Date();

    // Current time in Europe/London
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      weekday: "short",
    }).formatToParts(now);

    const hh = Number(parts.find(p => p.type === "hour")?.value ?? "0");
    const mm = Number(parts.find(p => p.type === "minute")?.value ?? "0");
    const wd = new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short" }).format(now);

    const minutes = hh * 60 + mm;
    const isSunday = wd.toLowerCase().startsWith("sun");
    const within = minutes >= 9 * 60 && minutes < 20 * 60; // 09:00–19:59

    setOpen(!isSunday && within);
  }, []);

  if (open === null) {
    // tiny skeleton
    return (
      <span
        className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
        style={{ background: "var(--color-brand-1-20)", color: "var(--color-brand-1)" }}
      >
        …
      </span>
    );
  }

  return open ? (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: "var(--color-brand-2)", color: "#fff" }}
      aria-label="We are open now"
      title="Mon–Sat · 9:00–20:00"
    >
      ● Open now
    </span>
  ) : (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: "var(--color-brand-1-20)", color: "var(--color-brand-1)" }}
      aria-label="We are currently closed"
      title="Mon–Sat · 9:00–20:00"
    >
      ○ Closed
    </span>
  );
}
