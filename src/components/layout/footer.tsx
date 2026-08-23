import Link from "next/link";
import { FaTiktok } from "react-icons/fa6";

const FOOTER_GROUPS = [
  {
    title: "Shop",
    links: [
      { label: "Protein Oats", href: "/products" },
      { label: "Peanut Butter Powder", href: "/products" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Ingredients We Trust", href: "/ingredients" },
      { label: "Science Behind It", href: "/science" },
      // { label: "Mornfreak Community", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQs", href: "/faqs" },
      // { label: "Shipping & Delivery", href: "/contact" },
      { label: "Returns & Refunds", href: "/refund-policy" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

const SOCIAL_PILL_CLASS =
  "inline-flex h-10 w-10 items-center justify-center rounded-full bg-oat-cream text-cocoa-espresso transition-transform hover:-translate-y-0.5";

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return <FaTiktok size={size} aria-hidden />;
}

export function Footer() {
  return (
    <footer className="bg-ember-clay">
      <div className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr] lg:gap-16">
          <div>
            <Link
              href="/"
              aria-label="Mornfreak home"
              className="inline-block font-sans text-4xl font-semibold uppercase leading-none tracking-normal text-oat-cream transition-colors hover:text-toasted-almond"
            >
              Mornfreak
            </Link>
            <p className="mt-4 max-w-xs font-sans text-sm font-normal leading-relaxed text-oat-cream/70">
              Protein-forward breakfast for people who train, work, and move fast
              in the morning.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-toasted-almond">
                {group.title}
              </p>
              <ul className="mt-6 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm font-normal text-oat-cream/70 transition-colors hover:text-oat-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-cocoa-espresso/20 bg-ember-clay">
      </div>

      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="Mornfreak home"
          className="font-sans text-xl font-semibold uppercase tracking-normal text-oat-cream transition-colors hover:text-toasted-almond"
        >
          Mornfreak
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/mornfreak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mornfreak on Instagram"
            className={SOCIAL_PILL_CLASS}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com/@mornfreak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mornfreak on TikTok"
            className={SOCIAL_PILL_CLASS}
          >
            <TikTokIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
