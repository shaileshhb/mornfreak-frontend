"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { cn } from "@/lib/cn";

import type { ProductImage } from "./types";

type ProductImageCarouselProps = {
  images: ProductImage[];
  productName: string;
  className?: string;
};

export function ProductImageCarousel({
  images,
  productName,
  className,
}: ProductImageCarouselProps) {
  const labelId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (total === 0) {
    return (
      <div
        className={cn(
          "flex aspect-square items-center justify-center text-sm text-muted-foreground",
          className,
        )}
      >
        No images available
      </div>
    );
  }

  return (
    <div className={cn("min-w-0", className)}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="relative aspect-square w-full touch-pan-y overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <p id={labelId} className="sr-only">
          {productName} product images
        </p>

        {images.map((image, index) => (
          <Image
            key={image.url}
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            className={cn(
              "object-contain motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out",
              index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
            aria-hidden={index !== activeIndex}
          />
        ))}

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-foreground/70 transition-colors hover:text-foreground sm:left-3"
            >
              <ChevronLeft aria-hidden size={28} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-foreground/70 transition-colors hover:text-foreground sm:right-3"
            >
              <ChevronRight aria-hidden size={28} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.url}
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              type="button"
              aria-label={`Show image ${index + 1} of ${total}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors sm:h-24 sm:w-24 lg:h-[6.75rem] lg:w-[6.75rem]",
                index === activeIndex
                  ? "border-foreground"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="108px"
                className="object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
