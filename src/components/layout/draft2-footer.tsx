"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { DRAFT2_BASE, draft2Path } from "@/lib/draft2";

const FOOTER_GROUPS = [
  {
    title: "Shop",
    links: [
      { label: "Protein Oats", href: draft2Path("/products") },
      { label: "Peanut Butter Powder", href: draft2Path("/products") },
      { label: "Bundles & Combos", href: draft2Path("/products") },
      { label: "Accessories", href: draft2Path("/products") },
      { label: "New Arrivals", href: draft2Path("/products") },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Our Story", href: draft2Path("/about") },
      { label: "Ingredients We Trust", href: draft2Path("/about") },
      { label: "Science Behind It", href: draft2Path("/about") },
      { label: "Recipes", href: draft2Path("/about") },
      { label: "Mornfreak Community", href: draft2Path("/contact") },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQs", href: draft2Path("/contact") },
      { label: "Shipping & Delivery", href: draft2Path("/contact") },
      { label: "Returns & Refunds", href: draft2Path("/contact") },
      { label: "Track Your Order", href: draft2Path("/contact") },
      { label: "Contact Us", href: draft2Path("/contact") },
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

function YoutubeIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function TikTokIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.2 8.2 0 0 0 4.76 1.52V6.86a4.85 4.85 0 0 1-1-.17z" />
    </svg>
  );
}

export function Draft2Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <footer>
      <div className="bg-[#fdf2e2]">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] lg:px-10">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-orange">
                {group.title}
              </p>
              <div className="mt-2 h-px w-10 bg-orange" aria-hidden />
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm uppercase tracking-wide text-foreground/75 transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-sans text-2xl font-bold lowercase leading-none tracking-tight text-orange">
              join the morning club.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70">
              Be the first to know about new drops, exclusive offers, health tips &amp; more. Start
              your mornings right.
            </p>

            {submitted ? (
              <p className="mt-5 font-sans text-sm font-medium text-orange">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-2 sm:flex-row"
                id="draft2-newsletter"
              >
                <label htmlFor="draft2-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="draft2-newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="E-mail address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 flex-1 border border-foreground/20 bg-white px-3 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center bg-orange px-6 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
                >
                  Sign up
                </button>
              </form>
            )}

            <p className="mt-3 text-xs text-foreground/55">
              By signing up, you agree to our{" "}
              <Link href={draft2Path("/contact")} className="font-medium text-orange hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href={draft2Path("/contact")} className="font-medium text-orange hover:underline">
                Terms
              </Link>
              .
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/mornfreak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mornfreak on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange text-white transition-transform hover:-translate-y-0.5"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mornfreak on TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange text-white transition-transform hover:-translate-y-0.5"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mornfreak on YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange text-white transition-transform hover:-translate-y-0.5"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange">
        <div className="mx-auto flex max-w-[90rem] items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <Link
            href={DRAFT2_BASE}
            aria-label="Mornfreak home"
            className="font-display text-[clamp(3.5rem,12vw,7.5rem)] lowercase leading-none tracking-tight text-white"
          >
            mornfreak
            <span className="align-super text-[0.35em]" aria-hidden>
              *
            </span>
            <span className="ml-1 align-super text-[0.2em] font-sans tracking-normal">TM</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
