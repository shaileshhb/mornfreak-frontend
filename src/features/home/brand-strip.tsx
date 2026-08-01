"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

const BADGES = [
  "Non-GMO",
  "High Fiber",
  "No Preservatives",
  "Gluten-Free",
  "Plant-Based",
  "No Added Sugar",
  "Naturally Sweetened",
];

export function BrandStrip() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div ref={ref} className="overflow-hidden bg-foreground py-5">
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 transition-all duration-500",
          inView ? "animate-fade-in opacity-100" : "opacity-0",
        )}
      >
        {BADGES.map((badge, i) => (
          <span key={badge} className="flex items-center gap-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              {badge}
            </span>
            {i < BADGES.length - 1 && (
              <span
                aria-hidden
                className="h-1 w-1 rounded-full bg-primary opacity-80"
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
