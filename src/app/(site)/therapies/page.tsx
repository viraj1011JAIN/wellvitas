import type { Metadata } from "next";
import TherapiesClient from "@/components/TherapiesClient";

export const metadata: Metadata = {
  title: "Therapies | Wellvitas",
  description:
    "Explore Wellvitas therapies including Hyperbaric Oxygen, Light-based therapies, Laser Acupuncture, PEMF, Compression, Physiotherapy and more.",
  alternates: { canonical: "/therapies" },
  openGraph: {
    title: "Therapies | Wellvitas",
    description:
      "Explore Wellvitas therapies including Hyperbaric Oxygen, Light-based therapies, Laser Acupuncture, PEMF, Compression, Physiotherapy and more.",
    url: "https://wellvitas.co.uk/therapies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Therapies | Wellvitas",
    description:
      "Explore Wellvitas therapies including Hyperbaric Oxygen, Light-based therapies, Laser Acupuncture, PEMF, Compression, Physiotherapy and more.",
  },
};

export default function Page() {
  return <TherapiesClient />;
}
