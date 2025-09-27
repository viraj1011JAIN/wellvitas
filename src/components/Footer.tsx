// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-0"
      style={{
        background: "linear-gradient(135deg, #7E0054 0%, #2E0056 100%)",
        color: "#fff",
      }}
    >
      <div className="section pt-10 pb-12">
        <div
          className="grid gap-8 md:grid-cols-3 items-start"
          aria-labelledby="footer-heading"
          role="contentinfo"
        >
          {/* Contact */}
          <div>
            <h2 id="footer-heading" className="sr-only">
              Wellvitas footer
            </h2>
            <h3 className="font-bold text-white">Contact</h3>

            <address className="not-italic mt-3 text-sm space-y-1 font-semibold text-white">
              <div>Wellvitas</div>
              <div>1626 Great Western Rd</div>
              <div>Anniesland, Glasgow G13 1HH</div>
              <div>Open 9:00–20:00</div>
            </address>

            <div className="mt-3 text-sm space-y-1 font-semibold">
              <a
                className="block underline decoration-white/50 hover:decoration-white text-white"
                href="mailto:info@wellvitas.co.uk"
              >
                info@wellvitas.co.uk
              </a>
              <a
                className="block underline decoration-white/50 hover:decoration-white text-white"
                href="tel:+447379005856"
              >
                +44 7379 005856
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="font-bold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm font-semibold">
              <li>
                <Link
                  className="underline decoration-white/50 hover:decoration-white text-white"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="underline decoration-white/50 hover:decoration-white text-white"
                  href="/therapies"
                >
                  Therapies
                </Link>
              </li>
              <li>
                <Link
                  className="underline decoration-white/50 hover:decoration-white text-white"
                  href="/booking"
                >
                  Booking
                </Link>
              </li>
              <li>
                <a
                  className="underline decoration-white/50 hover:decoration-white text-white"
                  href="#therapies"
                >
                  Latest news &amp; therapies
                </a>
              </li>
            </ul>
          </nav>

          {/* Map (right side) */}
          <div>
            <h3 className="font-bold text-white">Find Us</h3>
            <div id="footer-map" className="map-embed mt-3">
              <iframe
                title="Wellvitas location"
                src="https://www.google.com/maps?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
            <div className="mt-3">
              <a
                className="btn rounded-2xl"
                target="_blank"
                rel="noreferrer"
                href="https://maps.google.com/?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH"
                style={{
                  backgroundColor: "#2E0056", // purple button
                  color: "#fff",
                  border: "none",
                }}
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs font-semibold text-white/80">
          © {new Date().getFullYear()} Wellvitas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
