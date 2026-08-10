"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
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
  const [showControls, setShowControls] = useState(false);
  const dragStartX = useRef<number | null>(null);
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
          "flex aspect-square items-center justify-center rounded-2xl border border-border bg-muted text-sm text-muted-foreground",
          className,
        )}
      >
        No images available
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row lg:items-start", className)}>
      {/* Desktop vertical thumbs */}
      {total > 1 && (
        <div className="hidden shrink-0 flex-col gap-2 lg:flex">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              aria-label={`Show image ${index + 1} of ${total}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className={cn(
                "relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors",
                index === activeIndex
                  ? "border-foreground"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onFocus={() => setShowControls(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setShowControls(false);
            }
          }}
          className="group relative aspect-square touch-pan-y overflow-hidden rounded-2xl border border-border bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className={cn(
                "object-contain p-6 motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out",
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
                className={cn(
                  "absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-opacity",
                  showControls ? "opacity-100" : "opacity-0 lg:opacity-0 lg:group-hover:opacity-100",
                )}
              >
                <ChevronLeft aria-hidden size={20} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={goNext}
                className={cn(
                  "absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-opacity",
                  showControls ? "opacity-100" : "opacity-0 lg:opacity-0 lg:group-hover:opacity-100",
                )}
              >
                <ChevronRight aria-hidden size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 lg:hidden">
                {images.map((image, index) => (
                  <button
                    key={image.url}
                    type="button"
                    aria-label={`Go to image ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => goTo(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      index === activeIndex ? "bg-foreground" : "bg-foreground/30",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Mobile / tablet horizontal thumbs */}
        {total > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
            {images.map((image, index) => (
              <button
                key={image.url}
                type="button"
                aria-label={`Show image ${index + 1} of ${total}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goTo(index)}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                  index === activeIndex
                    ? "border-foreground"
                    : "border-transparent opacity-70",
                )}
              >
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
