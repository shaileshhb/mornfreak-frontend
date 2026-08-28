"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import { FaqAccordionItem } from "./faq-accordion-item";
import { FAQ_CATEGORIES } from "./faq-data";

export function FaqContent() {
  const [activeId, setActiveId] = useState(FAQ_CATEGORIES[0]?.id ?? "");

  useEffect(() => {
    const sections = FAQ_CATEGORIES.map((category) =>
      document.getElementById(category.id),
    ).filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function scrollToCategory(id: string) {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[13.5rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
      <nav aria-label="FAQ categories" className="md:sticky md:top-28 md:self-start">
        <ul className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-col md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {FAQ_CATEGORIES.map((category) => {
            const isActive = category.id === activeId;

            return (
              <li key={category.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToCategory(category.id)}
                  className={cn(
                    "font-sans text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive && "font-semibold text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "border-b-2 pb-1",
                      isActive ? "border-primary" : "border-transparent",
                    )}
                  >
                    {category.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-12">
        {FAQ_CATEGORIES.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-28">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground sm:text-2xl">
              {category.title}
            </h2>
            <div className="mt-4 border-b border-border">
              {category.items.map((item) => (
                <FaqAccordionItem key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
