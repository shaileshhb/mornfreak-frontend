"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";

import type { FaqItem } from "./faq-data";

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

export function FaqAccordionItem({ item }: { item: FaqItem }) {
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
