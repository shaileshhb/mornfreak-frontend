import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "Shop",
    links: [
      { label: "Protein Oats", href: "/products" },
      { label: "Peanut Butter Powder", href: "/products" },
      // { label: "Bundles & Combos", href: "/products" },
      { label: "New Arrivals", href: "/products" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Ingredients We Trust", href: "/our-story" },
      { label: "Science Behind It", href: "/science" },
      // { label: "Mornfreak Community", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQs", href: "/contact" },
      { label: "Shipping & Delivery", href: "/contact" },
      { label: "Returns & Refunds", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

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

export function Footer() {
  return (
    <footer>
      <div className="border-t border-foreground/10 bg-background">
        <div className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
            <div>
              <Link
                href="/"
                aria-label="Mornfreak home"
                className="inline-block font-display text-4xl uppercase leading-none tracking-normal text-foreground transition-colors hover:text-primary"
              >
                Mornfreak
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Protein-forward breakfast for people who train, work, and move fast
                in the morning.
              </p>
              <a
                href="https://www.instagram.com/mornfreak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mornfreak on Instagram"
                className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <InstagramIcon />
              </a>
            </div>

            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {group.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-foreground/65 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 pt-6 text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
            <p>© {new Date().getFullYear()} Mornfreak. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="/contact" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/"
        aria-label="Mornfreak home"
        className="flex min-h-40 items-center justify-center bg-primary px-4 text-primary-foreground"
      >
        <span className="font-display text-[clamp(2rem,6vw,5rem)] uppercase leading-none tracking-normal">
          Mornfreak
        </span>
      </Link>
    </footer>
  );
}
