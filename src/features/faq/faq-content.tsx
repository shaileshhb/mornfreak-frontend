"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";

import { FAQ_CATEGORIES, type FaqItem } from "./faq-data";

function renderAnswer(answer: string) {
  return answer.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const baseId = useId();
  const [open, setOpen] = useState(false);
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="border-t border-border">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-sans text-base font-semibold text-foreground sm:text-lg">
            {item.question}
          </span>
          <ChevronDown
            aria-hidden
            size={18}
            className={cn(
              "shrink-0 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200",
              open && "rotate-180 text-primary",
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p
            className="pb-5 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base"
            {...(!open ? { inert: true as const } : {})}
          >
            {renderAnswer(item.answer)}
          </p>
        </div>
      </div>
    </div>
  );
}

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
            <h2 className="font-display text-xl uppercase tracking-wide text-foreground sm:text-2xl">
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
