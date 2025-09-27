// src/components/BookingFlow.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────
   Step meta (for the big story-style timeline)
   ────────────────────────────────────────────────────────────────────────── */
const STEP_META = [
  { key: "enquiry",   title: "Make an enquiry",                 desc: "Tell us a bit about you and what you’re looking for.",         icon: "💬" },
  { key: "screening", title: "Complete the health screening",   desc: "A quick safety check so we recommend the right care.",        icon: "🩺" },
  { key: "taster",    title: "Have a free taster treatment",    desc: "Pick a 30-minute slot to experience the approach.",           icon: "✨" },
  { key: "programme", title: "Set up your programme & payment", desc: "Choose a session bundle and how you’d like to pay.",          icon: "📅" },
  { key: "start",     title: "Start feeling better!",           desc: "We confirm details and get you started.",                     icon: "🌿" },
] as const;

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  preferredContact: "email" | "phone" | "whatsapp";
  therapies: string[];
};
type Screening = { conditions: string[]; notes: string };
type Taster = { date: string; time: string };
type Programme = { package: "taster" | "4" | "8" | "12"; payment: "payg" | "plan" };

const THERAPY_OPTIONS = [
  "Hyperbaric Oxygen",
  "Light-based Therapies",
  "Laser Acupuncture",
  "PEMF Therapy",
  "Compression Therapy",
  "Physiotherapy",
  "Combined Programme",
];

const LS_KEY = "wellvitas_booking_v1";

/* ──────────────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────────────── */
function normalizePhone(v: string) {
  return v.replace(/[^\d+]/g, "");
}

function parseTimeOnDate(dateStr: string, timeHHMM: string): Date | null {
  if (!dateStr || !timeHHMM) return null;
  const [h, m] = timeHHMM.split(":").map((n) => parseInt(n, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h, m, 0, 0);
  return d;
}

/** Hide past slots when booking for "today" */
function getAvailableTimeSlots(dateStr: string, baseSlots: string[]): string[] {
  if (!dateStr) return baseSlots;
  const now = new Date();
  const selected = new Date(dateStr + "T00:00:00");
  const isToday =
    now.getFullYear() === selected.getFullYear() &&
    now.getMonth() === selected.getMonth() &&
    now.getDate() === selected.getDate();

  if (!isToday) return baseSlots;

  // Give 15 min buffer
  const cutoff = new Date(now.getTime() + 15 * 60 * 1000);
  return baseSlots.filter((hhmm) => {
    const dt = parseTimeOnDate(dateStr, hhmm)!;
    return dt.getTime() > cutoff.getTime();
  });
}

/* ──────────────────────────────────────────────────────────────────────────
   Vertical stepper (left column on desktop)
   ────────────────────────────────────────────────────────────────────────── */
function StepperVertical({ active }: { active: number }) {
  return (
    <aside className="hidden md:block pr-2">
      <div className="relative pl-12">
        {/* Rail */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" aria-hidden />
        <ol className="space-y-5">
          {STEP_META.map((s, i) => {
            const done = i < active;
            const isActive = i === active;
            return (
              <li key={s.key} className="relative">
                {/* Dot */}
                <div
                  className={[
                    "absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold",
                    done
                      ? "text-white"
                      : isActive
                      ? "bg-white"
                      : "bg-white text-slate-600 border-slate-300",
                  ].join(" ")}
                  style={
                    done
                      ? { background: "var(--color-brand-1)", borderColor: "var(--color-brand-1)" }
                      : isActive
                      ? { color: "var(--color-brand-1)", borderColor: "var(--color-brand-1)" }
                      : undefined
                  }
                  aria-hidden
                >
                  {done ? "✓" : i + 1}
                </div>

                {/* Card */}
                <div
                  className={[
                    "rounded-xl border p-4 transition",
                    isActive ? "bg-white shadow-card" : "bg-white/80 border-slate-200",
                  ].join(" ")}
                  style={isActive ? { borderColor: "color-mix(in srgb, var(--color-brand-1) 30%, white)" } : undefined}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden>
                      {s.icon}
                    </span>
                    <h3
                      className={["text-sm font-semibold", isActive ? "" : "text-slate-700"].join(" ")}
                      style={isActive ? { color: "var(--color-brand-1)" } : undefined}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────────────────────────────────── */
export default function BookingFlow() {
  const [step, setStep] = useState(0);

  // Form state
  const [enquiry, setEnquiry] = useState<Enquiry>({
    name: "",
    email: "",
    phone: "",
    preferredContact: "whatsapp",
    therapies: [],
  });
  const [screening, setScreening] = useState<Screening>({ conditions: [], notes: "" });
  const [taster, setTaster] = useState<Taster>({ date: "", time: "" });
  const [programme, setProgramme] = useState<Programme>({ package: "taster", payment: "payg" });

  // UX + submit state
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const v = JSON.parse(raw);
        setEnquiry(v.enquiry ?? enquiry);
        setScreening(v.screening ?? screening);
        setTaster(v.taster ?? taster);
        setProgramme(v.programme ?? programme);
        setAccepted(v.accepted ?? false);
        setStep(v.step ?? 0);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save draft
  useEffect(() => {
    const payload = { step, enquiry, screening, taster, programme, accepted };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } catch {}
  }, [step, enquiry, screening, taster, programme, accepted]);

  const progress = (step / (STEP_META.length - 1)) * 100;

  const price = useMemo(() => {
    const base = { taster: 0, "4": 180, "8": 320, "12": 450 } as const;
    return base[programme.package];
  }, [programme.package]);

  function toggleChip(list: string[], value: string, set: (v: string[]) => void) {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  function validateCurrentStep(): string[] {
    const e: string[] = [];
    if (step === 0) {
      if (!enquiry.name.trim()) e.push("Enter your full name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) e.push("Enter a valid email.");
      if (!enquiry.phone.trim()) e.push("Enter your phone number.");
    }
    if (step === 2) {
      if (!taster.date) e.push("Choose a date for your taster.");
      if (!taster.time) e.push("Choose a time for your taster.");
    }
    if (step === 4 && !accepted) e.push("Please accept the contact & privacy notice.");
    return e;
  }

  function next() {
    const e = validateCurrentStep();
    setErrors(e);
    if (e.length) return;
    setStep((s) => Math.min(s + 1, STEP_META.length - 1));
    scrollUp();
  }
  function back() {
    setErrors([]);
    setStep((s) => Math.max(s - 1, 0));
    scrollUp();
  }
  function scrollUp() {
    const y = (document.getElementById("book-form-root")?.offsetTop || 0) - 24;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function buildWhatsappText() {
    const parts = [
      `Hello Wellvitas — I'd like to book.`,
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${normalizePhone(enquiry.phone)}`,
      `Contact: ${enquiry.preferredContact}`,
      `Therapies: ${enquiry.therapies.join(", ") || "TBC"}`,
      `Conditions: ${screening.conditions.join(", ") || "—"}`,
      screening.notes ? `Notes: ${screening.notes}` : "",
      `Taster: ${taster.date || "TBC"} ${taster.time || ""}`,
      `Programme: ${programme.package === "taster" ? "Taster only" : `${programme.package} sessions`} (${programme.payment})`,
    ].filter(Boolean);
    return encodeURIComponent(parts.join("\n"));
  }

  function downloadICS() {
    const start = taster.date && taster.time ? parseTimeOnDate(taster.date, taster.time) : null;
    if (!start) return;
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const pad = (n: number) => String(n).padStart(2, "0");
    const fmt = (dt: Date) =>
      `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}T${pad(
        dt.getUTCHours()
      )}${pad(dt.getUTCMinutes())}${pad(dt.getUTCSeconds())}Z`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wellvitas//Booking//EN",
      "BEGIN:VEVENT",
      `UID:${crypto.randomUUID()}@wellvitas.co.uk`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      "SUMMARY:Wellvitas – Free Taster",
      "LOCATION:1620 Great Western Rd, Anniesland, Glasgow G13 1HH",
      "DESCRIPTION:Free taster session booked via wellvitas.co.uk",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wellvitas-taster.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function submit() {
    const e = validateCurrentStep();
    setErrors(e);
    if (e.length) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiry: { ...enquiry, phone: normalizePhone(enquiry.phone) },
          screening,
          taster,
          programme,
          meta: { submittedAt: new Date().toISOString(), ua: navigator.userAgent },
          website, // honeypot
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.errors?.join("\n") || "Submission failed. Please try again.";
        alert(msg);
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      localStorage.removeItem(LS_KEY);
    } catch {
      alert("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  // Base slots; filtered when "today"
  const BASE_SLOTS = ["09:30", "11:00", "14:30", "16:00", "18:30"];
  const slots = getAvailableTimeSlots(taster.date, BASE_SLOTS);

  // Auto-select first available slot if date changes and none chosen
  useEffect(() => {
    if (!taster.date) return;
    if (!taster.time || !slots.includes(taster.time)) {
      const first = slots[0] || "";
      setTaster((prev) => ({ ...prev, time: first }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taster.date]);

  /* ─── Submitted state ─── */
  if (submitted) {
    return (
      <div className="card p-6">
        <div className="flex items-start gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-full text-white"
            style={{ background: "var(--color-brand-1)" }}
          >
            ✓
          </div>
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--color-brand-1)" }}
            >
              Thanks, {enquiry.name.split(" ")[0] || "there"}!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              We’ve received your booking and will confirm shortly. You can add the taster to your calendar or ping us on WhatsApp.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn btn-outline" onClick={downloadICS}>Add to calendar (.ics)</button>
              <a className="btn btn-primary" href={`https://wa.me/447000000000?text=${buildWhatsappText()}`} target="_blank" rel="noreferrer">
                Send on WhatsApp
              </a>
              <Link className="btn btn-outline" href="/">Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Default (form) state ─── */
  return (
    <div id="book-form-root" className="card p-0 md:p-6">
      {/* Top progress (mobile) */}
      <div className="md:hidden px-4 pt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full transition-[width]"
            style={{ width: `${progress}%`, background: "var(--color-brand-1)" }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-600">
          Step {step + 1} of {STEP_META.length}: <span className="font-medium">{STEP_META[step].title}</span>
        </p>
      </div>

      <div className="grid gap-0 md:gap-6 md:grid-cols-[280px,1fr]">
        {/* Left: timeline */}
        <StepperVertical active={step} />

        {/* Right: form area */}
        <div className="p-4 md:p-0">
          {/* Error summary */}
          {!!errors.length && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              <p className="font-medium">Please fix the following:</p>
              <ul className="list-disc pl-5">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          )}

          {/* Honeypot */}
          <label className="sr-only">
            Website
            <input
              type="text"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>

          {/* ── STEP 0: ENQUIRY ── */}
          {step === 0 && (
            <section className="space-y-6">
              <header className="glass inline-flex items-center gap-2 px-3 py-2">
                <span className="text-xl" aria-hidden>💬</span>
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                  Make an enquiry
                </h2>
              </header>
              <p className="text-sm text-slate-600">Share your details and what you’re interested in — we’ll get back fast.</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium" htmlFor="enq-name">Full name</label>
                  <input
                    id="enq-name"
                    className="input mt-1"
                    type="text"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    value={enquiry.name}
                    onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="enq-email">Email</label>
                  <input
                    id="enq-email"
                    className="input mt-1"
                    type="email"
                    placeholder="you@email.com"
                    autoComplete="email"
                    value={enquiry.email}
                    onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="enq-phone">Phone</label>
                  <input
                    id="enq-phone"
                    className="input mt-1"
                    type="tel"
                    inputMode="tel"
                    placeholder="+44 …"
                    autoComplete="tel"
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                  />
                  <p className="help" id="phone-help">We’ll only use this for your booking.</p>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="enq-pref">Preferred contact</label>
                  <select
                    id="enq-pref"
                    className="input mt-1"
                    value={enquiry.preferredContact}
                    onChange={(e) =>
                      setEnquiry({ ...enquiry, preferredContact: e.target.value as Enquiry["preferredContact"] })
                    }
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Therapies you’re interested in</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {THERAPY_OPTIONS.map((t) => {
                    const on = enquiry.therapies.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={on}
                        className={`chip ${on ? "chip-active" : ""}`}
                        onClick={() => toggleChip(enquiry.therapies, t, (v) => setEnquiry({ ...enquiry, therapies: v }))}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
                <p className="help">Not sure yet? Pick a couple — you can change later.</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  We’ll never share your details. See our{" "}
                  <Link className="link" href="/privacy">privacy policy</Link>.
                </span>
                <button className="btn btn-primary" onClick={next}>Continue</button>
              </div>
            </section>
          )}

          {/* ── STEP 1: SCREENING ── */}
          {step === 1 && (
            <section className="space-y-6">
              <header className="glass inline-flex items-center gap-2 px-3 py-2">
                <span className="text-xl" aria-hidden>🩺</span>
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                  Health screening
                </h2>
              </header>
              <p className="text-sm text-slate-600">A quick check so we tailor recommendations safely.</p>

              <div>
                <label className="text-sm font-medium">Any relevant conditions?</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "Back pain",
                    "Neck/shoulder pain",
                    "Sports injury",
                    "Arthritis",
                    "Post-surgery rehab",
                    "Stress/anxiety",
                    "Other",
                  ].map((c) => {
                    const on = screening.conditions.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={on}
                        className={`chip ${on ? "chip-active" : ""}`}
                        onClick={() => toggleChip(screening.conditions, c, (v) => setScreening({ ...screening, conditions: v }))}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="screen-notes">Notes (medications, goals, anything else)</label>
                <textarea
                  id="screen-notes"
                  className="textarea mt-1"
                  rows={4}
                  placeholder="Tell us anything useful…"
                  value={screening.notes}
                  onChange={(e) => setScreening({ ...screening, notes: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between">
                <button className="btn btn-outline" onClick={back}>Back</button>
                <button className="btn btn-primary" onClick={next}>Continue</button>
              </div>
            </section>
          )}

          {/* ── STEP 2: TASTER ── */}
          {step === 2 && (
            <section className="space-y-6">
              <header className="glass inline-flex items-center gap-2 px-3 py-2">
                <span className="text-xl" aria-hidden>✨</span>
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                  Book your free taster
                </h2>
              </header>
              <p className="text-sm text-slate-600">Choose a 30-minute slot that works for you.</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium" htmlFor="t-date">Date</label>
                  <input
                    id="t-date"
                    className="input mt-1"
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={taster.date}
                    onChange={(e) => setTaster({ ...taster, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {slots.length === 0 ? (
                      <span className="col-span-3 text-sm text-slate-500">No slots left today — try another date.</span>
                    ) : (
                      slots.map((t) => {
                        const on = taster.time === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            className={`chip ${on ? "chip-active" : ""}`}
                            onClick={() => setTaster({ ...taster, time: t })}
                          >
                            {t}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button className="btn btn-outline" onClick={back}>Back</button>
                <button className="btn btn-primary" onClick={next} disabled={!taster.date || !taster.time}>Continue</button>
              </div>
            </section>
          )}

          {/* ── STEP 3: PROGRAMME ── */}
          {step === 3 && (
            <section className="space-y-6">
              <header className="glass inline-flex items-center gap-2 px-3 py-2">
                <span className="text-xl" aria-hidden>📅</span>
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                  Programme & payment
                </h2>
              </header>
              <p className="text-sm text-slate-600">Pick a bundle and how you’d like to pay.</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Package</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {[
                      { v: "taster", label: "Just taster" },
                      { v: "4", label: "4 sessions" },
                      { v: "8", label: "8 sessions" },
                      { v: "12", label: "12 sessions" },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        aria-pressed={programme.package === (o.v as Programme["package"])}
                        className={`chip ${programme.package === o.v ? "chip-active" : ""}`}
                        onClick={() => setProgramme({ ...programme, package: o.v as Programme["package"] })}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Payment</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      { v: "payg", label: "Pay-as-you-go" },
                      { v: "plan", label: "Installment plan" },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        aria-pressed={programme.payment === (o.v as Programme["payment"])}
                        className={`chip ${programme.payment === o.v ? "chip-active" : ""}`}
                        onClick={() => setProgramme({ ...programme, payment: o.v as Programme["payment"] })}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Estimated total:</span>{" "}
                  {price > 0 ? <>£{price}{programme.payment === "plan" && " • monthly plan available"}</> : "Free taster"}
                </p>
                <p className="mt-1 text-xs text-slate-500">Final pricing confirmed after your taster and clinical recommendation.</p>
              </div>

              <div className="flex items-center justify-between">
                <button className="btn btn-outline" onClick={back}>Back</button>
                <button className="btn btn-primary" onClick={next}>Continue</button>
              </div>
            </section>
          )}

          {/* ── STEP 4: REVIEW ── */}
          {step === 4 && (
            <section className="space-y-6">
              <header className="glass inline-flex items-center gap-2 px-3 py-2">
                <span className="text-xl" aria-hidden>🌿</span>
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                  Review & submit
                </h2>
              </header>
              <p className="text-sm text-slate-600">Check details. We’ll confirm and get you started.</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                  <h3 className="font-medium">Your details</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li>{enquiry.name || "—"}</li>
                    <li>{enquiry.email || "—"}</li>
                    <li>{enquiry.phone || "—"}</li>
                    <li>Contact via {enquiry.preferredContact}</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                  <h3 className="font-medium">Therapies & notes</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    <li><span className="font-medium">Therapies:</span> {enquiry.therapies.length ? enquiry.therapies.join(", ") : "TBC"}</li>
                    <li><span className="font-medium">Conditions:</span> {screening.conditions.length ? screening.conditions.join(", ") : "—"}</li>
                  </ul>
                  {screening.notes && <p className="mt-2 text-sm text-slate-600"><span className="font-medium">Notes:</span> {screening.notes}</p>}
                </div>
                <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                  <h3 className="font-medium">Taster</h3>
                  <p className="mt-2 text-sm text-slate-600">{taster.date || "Date TBC"} at {taster.time || "Time TBC"}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                  <h3 className="font-medium">Programme</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {programme.package === "taster" ? "Taster only" : `${programme.package} sessions`} · {programme.payment === "plan" ? "Plan" : "Pay-as-you-go"}
                  </p>
                  <p className="text-sm text-slate-600">Estimate: {price > 0 ? `£${price}` : "Free"}</p>
                </div>
              </div>

              <label className="mt-2 flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                <span className="text-slate-600">
                  I agree to be contacted about my booking and I accept the{" "}
                  <Link className="link" href="/privacy">privacy policy</Link>.
                </span>
              </label>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  className="btn btn-outline"
                  href={`https://wa.me/447000000000?text=${buildWhatsappText()}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Send via WhatsApp
                </a>
                <button className="btn btn-primary ml-auto" onClick={submit} disabled={submitting || !accepted}>
                  {submitting ? "Submitting…" : "Submit booking"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    localStorage.removeItem(LS_KEY);
                    location.reload();
                  }}
                >
                  Reset form
                </button>
                <button type="button" className="btn btn-outline" onClick={downloadICS} disabled={!taster.date || !taster.time}>
                  Add taster to calendar
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
