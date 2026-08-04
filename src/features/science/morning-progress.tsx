"use client";

import { useEffect, useRef, useState } from "react";

import { useInView } from "@/hooks/use-in-view";

const ANIMATION_DURATION_MS = 1800;

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export function MorningProgress() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [percent, setPercent] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);
      setPercent(Math.round(easeOutQuart(progress) * 100));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative mx-auto mt-12 max-w-xl px-2">
      <div className="flex items-end justify-between gap-4">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          First Bowl
        </p>
        <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Every Morning
        </p>
      </div>
      <div className="relative mt-4 h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-150 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <span className="inline-flex min-w-[5.5rem] flex-col items-center justify-center rounded-xl border border-primary/20 bg-primary px-5 py-3 text-center text-primary-foreground">
          <span className="font-display text-3xl leading-none tracking-wide">{percent}%</span>
        </span>
      </div>
    </div>
  );
}
