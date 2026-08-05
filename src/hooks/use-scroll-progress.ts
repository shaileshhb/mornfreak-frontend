"use client";

import { useEffect, useRef, useState } from "react";

type UseScrollProgressOptions = {
  /** Viewport position (0–1) used as the progress anchor. Defaults to 0.45. */
  anchor?: number;
};

/**
 * Tracks how far an element has scrolled past a viewport anchor (0 → 1).
 * Returns 1 immediately when the user prefers reduced motion.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollProgressOptions = {},
): [React.RefObject<T | null>, number] {
  const { anchor = 0.45 } = options;
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (reduceMotion.matches) {
        setProgress(1);
        return;
      }

      const rect = el.getBoundingClientRect();
      if (rect.height <= 0) {
        setProgress(0);
        return;
      }

      const anchorY = window.innerHeight * anchor;
      const raw = (anchorY - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScrollOrResize = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    reduceMotion.addEventListener("change", update);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      reduceMotion.removeEventListener("change", update);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [anchor]);

  return [ref, progress];
}
