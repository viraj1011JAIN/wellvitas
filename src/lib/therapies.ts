/* ========= Types ========= */
export type Therapy = {
  id: string;
  slug: string;
  name: string;
  type: "Device" | "Manual" | "Combined";
  category:
    | "Oxygen"
    | "Light"
    | "Acupuncture"
    | "PEMF"
    | "Compression"
    | "Physiotherapy"
    | "Combined";
  short: string;
  long: string;
  duration: "30–45 min" | "45–60 min" | "60–90 min";
  price: "£" | "££" | "£££";
  /** Public image path (from /public). Same image is used on home + details. */
  image: string;
  icon?: string;
  tags?: string[];
  contraindications?: string[];
  benefits?: string[];
  forWho?: string[];
};

/* ========= Categories for home filter ========= */
export const CATEGORIES = [
  "All",
  "Oxygen",
  "Light",
  "Acupuncture",
  "PEMF",
  "Compression",
  "Physiotherapy",
  "Combined",
] as const;
export type CategoryFilter = (typeof CATEGORIES)[number];

/* ========= Data ========= */
export const THERAPIES: Therapy[] = [
  {
    id: "hbot",
    slug: "hyperbaric-oxygen-therapy",
    name: "Hyperbaric Oxygen Therapy",
    type: "Device",
    category: "Oxygen",
    short: "Pressurised oxygen sessions to support recovery, energy and healing.",
    long:
      "HBOT increases dissolved oxygen in blood plasma under controlled pressure. It may support post-injury recovery, energy metabolism, circulation and general tissue healing when used judiciously.",
    duration: "45–60 min",
    price: "£££",
    image: "/therapies/hbot.jpg",
    icon: "🫁",
    benefits: [
      "Supports tissue healing & oxygenation",
      "May reduce post-exercise fatigue",
      "Can assist certain chronic recovery cases",
    ],
    forWho: ["Post-injury recovery", "Low energy", "Slow tissue healing"],
    contraindications: ["Untreated pneumothorax", "Recent ear surgery", "Severe COPD (consult prior)"],
    tags: ["recovery", "energy", "healing"],
  },
  {
    id: "light",
    slug: "light-based-therapies",
    name: "Light-based Therapies",
    type: "Device",
    category: "Light",
    short: "Targeted red/near-IR light for tissue repair, pain relief and skin health.",
    long:
      "Photobiomodulation can modulate cellular energy and inflammatory signalling. Used for soft-tissue recovery, aches, and healthy skin support.",
    duration: "30–45 min",
    price: "££",
    image: "/therapies/light.jpg",
    icon: "💡",
    benefits: ["May reduce soreness and mild pain", "Supports tissue repair", "Skin vitality support"],
    forWho: ["Muscle aches", "Skin support", "General recovery"],
    tags: ["red light", "near-IR", "photobiomodulation"],
  },
  {
    id: "laser",
    slug: "laser-acupuncture",
    name: "Laser Acupuncture",
    type: "Device",
    category: "Acupuncture",
    short: "Needle-free photobiomodulation on classic points to rebalance and relax.",
    long:
      "Low-level light is applied to acupuncture points to encourage relaxation and autonomic balance—great for needle-averse clients.",
    duration: "30–45 min",
    price: "££",
    image: "/therapies/laser-acu.jpg",
    icon: "🎯",
    benefits: ["Deep relaxation", "Gentle autonomic rebalance"],
    forWho: ["Needle-averse clients", "Stress", "Sleep support"],
    tags: ["needle-free", "relaxation", "balance"],
  },
  {
    id: "pemf",
    slug: "pemf-therapy",
    name: "PEMF Therapy",
    type: "Device",
    category: "PEMF",
    short: "Pulsed electromagnetic fields to support circulation and cellular repair.",
    long:
      "Low-intensity electromagnetic pulses may encourage microcirculation and healthy cellular signalling—often used alongside other modalities.",
    duration: "30–45 min",
    price: "££",
    image: "/therapies/pemf.jpg",
    icon: "🧲",
    benefits: ["Microcirculation support", "Calming sensations"],
    forWho: ["General recovery", "Desk-based stiffness"],
    tags: ["circulation", "cellular", "recovery"],
  },
  {
    id: "compression",
    slug: "compression-therapy",
    name: "Compression Therapy",
    type: "Device",
    category: "Compression",
    short: "Peristaltic compression to boost lymphatic flow and aid recovery.",
    long:
      "Sequential compression can help move lymphatic fluid and ease heaviness in legs—popular with runners and recovery seekers.",
    duration: "30–45 min",
    price: "£",
    image: "/therapies/compression.jpg",
    icon: "🦵",
    benefits: ["Lighter legs", "Recovery between sessions"],
    forWho: ["Runners", "Heavy legs", "Desk-based sitting"],
    tags: ["lymphatic", "peristaltic", "recovery"],
  },
  {
    id: "physio",
    slug: "physiotherapy",
    name: "Physiotherapy",
    type: "Manual",
    category: "Physiotherapy",
    short: "Hands-on assessment, movement rehab and tailored exercise plans.",
    long:
      "Assessment-led treatment focused on movement quality, strength and pacing. We blend manual therapy with practical home exercises.",
    duration: "45–60 min",
    price: "££",
    image: "/therapies/physio.jpg",
    icon: "🏃",
    benefits: ["Personalised rehab", "Better movement patterns"],
    forWho: ["Injury rehab", "Mobility goals", "Chronic niggles"],
    tags: ["assessment", "rehab", "exercise"],
  },
  {
    id: "combined",
    slug: "combined-therapies",
    name: "Combined Therapies",
    type: "Combined",
    category: "Combined",
    short: "Custom programmes that blend modalities for faster, lasting results.",
    long:
      "We create short programmes that layer manual and device-based options to target your priorities with sensible frequency and progression.",
    duration: "60–90 min",
    price: "£££",
    image: "/therapies/combined.jpg",
    icon: "➕",
    benefits: ["Complementary effects", "Clear progression"],
    forWho: ["Multi-goal recovery", "Time-bound outcomes"],
    tags: ["programmes", "faster results"],
  },
];

/* ========= Lookups & helpers ========= */

// O(1) slug lookup
export const THERAPIES_BY_SLUG: Record<string, Therapy> = Object.fromEntries(
  THERAPIES.map((t) => [t.slug, t])
) as Record<string, Therapy>;

/** Get a therapy by slug (or null) */
export const getTherapyBySlug = (slug: string): Therapy | null =>
  THERAPIES_BY_SLUG[slug] ?? null;

/** Fallback image (place a file at /public/therapies/fallback.jpg to use it) */
export const THERAPY_FALLBACK_IMAGE = "/therapies/fallback.jpg";

/** Build the details page URL (query-based details page) */
export const therapyHref = (slug: string) => `/therapies?slug=${encodeURIComponent(slug)}`;

function slugToTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function ensureLeadingSlash(p: string) {
  return p.startsWith("/") ? p : `/${p}`;
}

/**
 * Single source of truth for therapy images.
 * Accepts a Therapy object or its slug and returns { src, alt }.
 * NOTE: We can't detect missing files at build-time; ensure your images exist in /public/therapies/.
 */
export function therapyImage(
  input: Therapy | string,
  opts?: { fallback?: string }
): { src: string; alt: string } {
  const t = typeof input === "string" ? getTherapyBySlug(input) : input;
  const slug = typeof input === "string" ? input : input.slug;

  const candidate = (t?.image ?? `/therapies/${slug}.jpg`).trim();
  const src = ensureLeadingSlash(candidate || opts?.fallback || THERAPY_FALLBACK_IMAGE);
  const alt = t?.name || slugToTitle(slug);

  return { src, alt };
}
