"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplet,
  Dumbbell,
  Heart,
  Leaf,
  Scale,
  ShieldCheck,
  Wheat,
  X,
  Zap,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";
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
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";

import type { ProductGalleryCallout, ProductGalleryCalloutIcon, ProductImage } from "./types";

type ProductImageCarouselProps = {
  images: ProductImage[];
  productName: string;
  overlayBadge?: string;
  galleryCallouts?: ProductGalleryCallout[];
  portrait?: boolean;
  className?: string;
};

function ProductImageLightbox({
  id,
  open,
  image,
  productName,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  id: string;
  open: boolean;
  image: ProductImage | undefined;
  productName: string;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, onPrev, onNext]);

  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    if (!root) return;

    const trapFocus = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = [
        ...root.querySelectorAll<HTMLElement>("button:not([disabled])"),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    root.addEventListener("keydown", trapFocus);
    return () => root.removeEventListener("keydown", trapFocus);
  }, [open, total]);

  if (!open || !image) return null;

  return createPortal(
    <div
      id={id}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-ink/90"
        onClick={onClose}
      />

      <p id={titleId} className="sr-only">
        {productName}: {image.alt}
      </p>

      <div className="relative z-10 flex h-full w-full max-w-5xl items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            key={image.url}
            src={image.url}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        aria-label="Close zoomed image"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink outline-none hover:bg-oat-cream focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <X aria-hidden size={20} strokeWidth={1.75} />
      </button>

      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={onPrev}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink outline-none hover:bg-oat-cream focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:left-6"
          >
            <ChevronLeft aria-hidden size={22} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={onNext}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink outline-none hover:bg-oat-cream focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:right-6"
          >
            <ChevronRight aria-hidden size={22} />
          </button>
          <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 font-sans text-sm text-paper">
            {index + 1} / {total}
          </p>
        </>
      ) : null}
    </div>,
    document.body,
  );
}

const CALLOUT_ICONS: Record<ProductGalleryCalloutIcon, LucideIcon> = {
  zap: Zap,
  leaf: Leaf,
  droplet: Droplet,
  check: Check,
  clock: Clock,
  wheat: Wheat,
  shield: ShieldCheck,
  dumbbell: Dumbbell,
  heart: Heart,
  scale: Scale,
};

export function ProductImageCarousel({
  images,
  productName,
  overlayBadge,
  galleryCallouts,
  portrait = false,
  className,
}: ProductImageCarouselProps) {
  const labelId = useId();
  const lightboxId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const zoomButtonRef = useRef<HTMLButtonElement>(null);
  const total = images.length;
  const activeImage = images[activeIndex];

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    zoomButtonRef.current?.focus();
  }, []);

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

  const openLightbox = () => {
    setLightboxOpen(true);
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
        className={cn(
          "relative w-full overflow-hidden rounded-2xl bg-product-background outline-none focus-visible:ring-2 focus-visible:ring-product-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          portrait ? "aspect-[4/5]" : "aspect-square",
          "lg:max-h-[min(70vh,calc(100vh-19rem))] lg:w-[min(100%,70vh,calc(100vh-19rem))]",
        )}
      >
        <p id={labelId} className="sr-only">
          {productName} product images
        </p>

        {/* TODO: replace with 4:5 product photo, target 1200px × 1500px (4:5) */}
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
              "object-contain p-4 motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out sm:p-6",
              index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
            aria-hidden={index !== activeIndex}
          />
        ))}

        {overlayBadge ? (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-product-badge px-2.5 py-1 font-sans text-[0.6875rem] font-semibold uppercase tracking-wider text-product-badge-foreground sm:left-4 sm:top-4">
            {overlayBadge}
          </span>
        ) : null}

        <button
          ref={zoomButtonRef}
          type="button"
          aria-label={`Zoom ${activeImage?.alt ?? "product image"}`}
          aria-expanded={lightboxOpen}
          aria-controls={lightboxOpen ? lightboxId : undefined}
          onClick={openLightbox}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-product-foreground shadow-sm outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-product-primary focus-visible:ring-offset-2 focus-visible:ring-offset-product-background sm:right-4 sm:top-4"
        >
          <ZoomIn aria-hidden size={18} strokeWidth={1.75} />
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-product-foreground outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-product-primary sm:left-3"
            >
              <ChevronLeft aria-hidden size={22} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-product-foreground outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-product-primary sm:right-3"
            >
              <ChevronRight aria-hidden size={22} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="scrollbar-hide mt-4 flex gap-2.5 overflow-x-auto pb-1">
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
                "relative aspect-square h-20 w-20 mt-1 ms-1  shrink-0 overflow-hidden rounded-xl bg-product-background outline-none ring-2 ring-offset-2 ring-offset-background transition-opacity focus-visible:ring-product-primary sm:h-24 sm:w-24 lg:h-[6.75rem] lg:w-[6.75rem]",
                index === activeIndex
                  ? "ring-product-primary"
                  : "ring-transparent opacity-70 hover:opacity-100",
              )}
            >
              {/* TODO: replace with matching 4:5 crop, target 320px × 400px (4:5) */}
              <Image
                src={image.url}
                alt=""
                fill
                sizes="108px"
                className="object-contain p-1"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      <ProductImageLightbox
        id={lightboxId}
        open={lightboxOpen}
        image={activeImage}
        productName={productName}
        index={activeIndex}
        total={total}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />

      {galleryCallouts && galleryCallouts.length > 0 ? (
        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
          {galleryCallouts.map((callout) => {
            const Icon = CALLOUT_ICONS[callout.icon];
            return (
              <li key={callout.label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-product-primary text-primary-foreground">
                  <Icon aria-hidden size={16} strokeWidth={1.75} />
                </span>
                <span className="font-sans text-xs font-medium leading-snug text-product-foreground sm:text-sm">
                  {callout.label}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
