// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wellvitas | Health • Wellness • Vitality",
  description:
    "Holistic therapies, wellness programmes, and lifestyle support in Glasgow.",
  metadataBase: new URL("https://wellvitas.co.uk"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/W_favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/W_favicon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/W_favicon.png",
    apple: "/W_favicon.png",
  },
  openGraph: {
    title: "Wellvitas",
    description:
      "Holistic therapies, wellness programmes, and lifestyle support in Glasgow.",
    url: "https://wellvitas.co.uk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellvitas",
    description:
      "Holistic therapies, wellness programmes, and lifestyle support in Glasgow.",
  },
  applicationName: "Wellvitas",
  themeColor: "#2E0056", // brand primary (deep purple)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={montserrat.variable}>
      <body className="font-sans min-h-dvh text-slate-900 antialiased">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only fixed left-2 top-2 z-[9999] rounded px-3 py-2 text-white"
          style={{ backgroundColor: "var(--color-brand-2)" }} // magenta
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        {/* Site-wide WhatsApp quick chat (hidden on /booking) */}
        <WhatsAppFab />
      </body>
    </html>
  );
}
