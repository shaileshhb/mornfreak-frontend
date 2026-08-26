"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/cn";
import "./home-hero.css";

interface Slide {
  id: string;
  kicker: string;
  headline: string;
  headlineSegments?: {
    text: string;
    accent?: boolean;
    italic?: boolean;
    breakBefore?: boolean;
  }[];
  body?: string;
  rating?: string;
  ratingStars?: number;
  ratingCount?: string;
  ctaLabel: string;
  ctaHref: string;
  ctaLabel2?: string;
  ctaHref2?: string;
  imageAlt: string;
  theme: "light" | "dark";
  layout: "full-bleed" | "split" | "glow";
  /**
   * Product shots with tight framing (no spare margin) should use contain +
   * toasted-almond panel. Current oats/PB assets have enough margin for cover.
   */
  imageDesktop?: string;
  imageMobile?: string;
  objectFit?: "cover" | "contain";
  objectPositionMobile?: string;
  objectPositionDesktop?: string;
  cutoutImage?: string;
  dataProduct?: "proteinOats" | "peanutButter";
  /** Radial product glow + float. Defaults to true for glow-layout slides. */
  showGlow?: boolean;
}

const SLIDES: Slide[] = [
  {
    id: "lifestyle",
    kicker: "Fuel your morning",
    headline: "Functional. Simple. Purposeful.",
    ctaLabel: "Shop now",
    ctaHref: "/products",
    imageDesktop: "/images/hero/img_1_desktop.avif",
    imageMobile: "/images/hero/img_1_mobile.avif",
    imageAlt:
      "People fueling their mornings with Mornfreak — eating, commuting, training, and studying",
    theme: "dark",
    layout: "full-bleed",
    objectFit: "cover",
    objectPositionMobile: "center",
    objectPositionDesktop: "center",
  },
  {
    // Protein oats hero (slide 2). New fields vs other glow slides:
    // ratingCount (star row above headline), italic headline segment,
    // ctaLabel2/ctaHref2 (outline pill), showGlow: false (flat oat-cream).
    // Copy below is placeholder and can be swapped for final marketing text.
    id: "protein-oats",
    kicker: "Protein oats",
    headline: "Discover your favourites. One meal at a time.",
    headlineSegments: [
      { text: "Discover your " },
      { text: "favourites. ", italic: true, breakBefore: true },
      { text: "One meal at a time.", breakBefore: true },
    ],
    body: "Mix and match 12 or more single-serve meals across shakes, sachets, and hot meals. Find what you love, then make it a habit.",
    ratingStars: 5,
    ratingCount: "2,400+ happy mornings",
    ctaLabel: "Shop Protein Oats",
    ctaHref: "/products/protein-oats",
    ctaLabel2: "Shop all Mornfreak",
    ctaHref2: "/products",
    imageAlt:
      "Mornfreak Protein Oats pouch with a bowl of rich chocolate oats, chocolate splash, and floating nuts and seeds",
    theme: "light",
    layout: "glow",
    cutoutImage: "/images/hero/protein-dashboard-1.avif",
    dataProduct: "proteinOats",
    showGlow: false,
  },
  {
    id: "peanut-butter",
    kicker: "Peanut butter powder",
    headline: "Good morning. Great choice.",
    headlineSegments: [
      { text: "Good morning. " },
      { text: "Great choice.", accent: true },
    ],
    body: "Real peanuts. Real nutrition. A smarter spread for a stronger, healthier you.",
    rating: "Clean ingredients. Nothing to hide.",
    ctaLabel: "Shop Peanut Butter",
    ctaHref: "/products/peanut-butter-powder",
    imageAlt:
      "Mornfreak peanut butter powder jar with peanuts and a bowl of peanut powder",
    theme: "light",
    layout: "glow",
    cutoutImage: "/images/raising-the-bar/peanut_butter_powder.avif",
    dataProduct: "peanutButter",
  },
];

const SLIDE_COUNT = SLIDES.length;
const AUTO_MS = 5500;
const SWIPE_THRESHOLD = 48;

function HeroArtDirection({
  slide,
  priority,
  sizesMobile,
  sizesDesktop,
}: {
  slide: Slide;
  priority?: boolean;
  sizesMobile: string;
  sizesDesktop: string;
}) {
  if (!slide.imageMobile || !slide.imageDesktop) return null;

  const isContain = slide.objectFit === "contain";
  // Fallback for future tight product shots: contain + toasted-almond panel.
  const panelClass = isContain ? "bg-toasted-almond" : undefined;
  // next/image `fill` writes inline object-fit/position — pass style so our
  // per-crop framing wins over the default `center center` inline styles.
  const fit = isContain ? "contain" : "cover";
  const posMobile = slide.objectPositionMobile ?? "center";
  const posDesktop = slide.objectPositionDesktop ?? "center";

  return (
    <div className={cn("relative h-full w-full", panelClass)}>
      <Image
        src={slide.imageMobile}
        alt={slide.imageAlt}
        fill
        priority={priority}
        sizes={sizesMobile}
        className="block md:hidden"
        style={{ objectFit: fit, objectPosition: posMobile }}
      />
      <Image
        src={slide.imageDesktop}
        alt={slide.imageAlt}
        fill
        priority={priority}
        sizes={sizesDesktop}
        className="hidden md:block"
        style={{ objectFit: fit, objectPosition: posDesktop }}
      />
    </div>
  );
}

function FuelGauge({
  index,
  progressKey,
  paused,
  reducedMotion,
  theme,
  onSelect,
}: {
  index: number;
  progressKey: number;
  paused: boolean;
  reducedMotion: boolean;
  theme: "light" | "dark";
  onSelect: (slideIndex: number) => void;
}) {
  return (
    <div className="flex w-full gap-1.5" role="tablist" aria-label="Hero slides">
      {SLIDES.map((slide, slideIndex) => {
        const isActive = slideIndex === index;
        return (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${slideIndex + 1}: ${slide.headline}`}
            onClick={() => onSelect(slideIndex)}
            className={cn(
              "relative h-[2px] flex-1 overflow-hidden bg-toasted-almond/20",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
              theme === "dark"
                ? "focus-visible:outline-oat-cream"
                : "focus-visible:outline-ink",
            )}
          >
            <span
              key={
                isActive ? `${progressKey}-${slideIndex}` : `idle-${slideIndex}`
              }
              className={cn(
                "absolute inset-y-0 left-0 w-full origin-left bg-ember-clay",
                isActive && !reducedMotion && "animate-hero-progress",
                isActive &&
                !reducedMotion &&
                paused &&
                "[animation-play-state:paused]",
                isActive && reducedMotion && "scale-x-100",
                !isActive && "scale-x-0",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function SlideText({
  slide,
  active,
  introReady,
  reducedMotion,
  index,
  progressKey,
  paused,
  onSelect,
  variant = "default",
}: {
  slide: Slide;
  active: boolean;
  introReady: boolean;
  reducedMotion: boolean;
  index: number;
  progressKey: number;
  paused: boolean;
  onSelect: (slideIndex: number) => void;
  variant?: "default" | "glow";
}) {
  const isDark = slide.theme === "dark";
  const isGlow = variant === "glow";
  const isItalicHeadline = Boolean(
    slide.headlineSegments?.some((segment) => segment.italic),
  );

  return (
    <div
      className={cn(
        "flex w-full flex-col",
        isGlow
          ? slide.ctaLabel2
            ? "max-w-[42rem]"
            : "max-w-[38rem]"
          : "max-w-[42ch]",
        "motion-reduce:translate-y-0",
        !reducedMotion && "transition-[opacity,transform] ease-out",
        active
          ? "translate-y-0 opacity-100 duration-300"
          : "pointer-events-none translate-y-3 opacity-0 duration-200",
      )}
    >
      {slide.ratingCount ? (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {slide.ratingStars ? (
            <div className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: slide.ratingStars }, (_, starIndex) => (
                <Star
                  key={starIndex}
                  className={cn(
                    "fill-ember-clay text-ember-clay",
                    isGlow ? "h-5 w-5 lg:h-6 lg:w-6" : "h-4 w-4",
                  )}
                />
              ))}
            </div>
          ) : null}
          <p
            className={cn(
              "font-sans font-medium",
              isGlow
                ? "text-[clamp(1.05rem,1rem+0.3vw,1.25rem)]"
                : "text-body",
              isDark ? "text-toasted-almond" : "text-cocoa-espresso",
            )}
          >
            {slide.ratingCount}
          </p>
        </div>
      ) : (
        <p
          className={cn(
            "font-sans font-semibold uppercase",
            isGlow
              ? "text-[clamp(0.95rem,0.85rem+0.4vw,1.15rem)] tracking-[0.08em]"
              : "text-kicker",
            isDark ? "text-oat-cream/80" : "text-ink/70",
          )}
        >
          {slide.kicker}
        </p>
      )}

      <h2
        className={cn(
          "font-display font-extrabold",
          isGlow
            ? isItalicHeadline
              ? "mt-4 text-[clamp(2.25rem,1.1rem+2.6vw,4rem)] leading-[1.08] tracking-[-0.03em] lg:mt-5 lg:leading-[1.05]"
              : "mt-4 text-[clamp(2.5rem,1.6rem+4.2vw,5.75rem)] leading-[1.0] tracking-[-0.03em] lg:mt-5"
            : "mt-3 text-h1",
          isDark ? "text-paper" : "text-ink",
        )}
      >
        {slide.headlineSegments
          ? slide.headlineSegments.map((segment, segmentIndex) => (
              <span key={segmentIndex}>
                {segment.breakBefore ? (
                  <br className="hidden lg:block" />
                ) : null}
                <span
                  className={cn(
                    segment.accent && "font-display font-bold",
                    segment.italic &&
                      "font-serif text-[0.92em] font-medium italic tracking-normal",
                    segment.breakBefore &&
                      !segment.italic &&
                      "lg:whitespace-nowrap",
                  )}
                >
                  {segment.text}
                </span>
              </span>
            ))
          : slide.headline}
      </h2>

      {slide.body ? (
        <p
          className={cn(
            "font-sans font-normal",
            isGlow
              ? "mt-5 text-[clamp(1.1rem,1rem+0.5vw,1.375rem)] leading-[1.6] lg:mt-6"
              : "mt-4 text-body",
            isDark ? "text-oat-cream/85" : "text-ink/80",
          )}
        >
          {slide.body}
        </p>
      ) : null}

      {slide.rating ? (
        <div
          className={cn(
            "flex items-center gap-2",
            isGlow ? "mt-5 lg:mt-6" : "mt-4",
          )}
        >
          {slide.ratingStars ? (
            <div className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: slide.ratingStars }, (_, starIndex) => (
                <Star
                  key={starIndex}
                  className={cn(
                    "fill-ember-clay text-ember-clay",
                    isGlow ? "h-5 w-5 lg:h-6 lg:w-6" : "h-4 w-4",
                  )}
                />
              ))}
            </div>
          ) : null}
          <p
            className={cn(
              "font-sans font-medium",
              isGlow
                ? "text-[clamp(1.05rem,1rem+0.3vw,1.25rem)]"
                : "text-body",
              isDark ? "text-toasted-almond" : "text-cocoa-espresso",
            )}
          >
            {slide.rating}
          </p>
        </div>
      ) : null}

      <div
        className={cn(
          "flex flex-wrap items-center gap-3",
          isGlow ? "mt-6 lg:mt-8" : "mt-6",
        )}
      >
        <Link
          href={slide.ctaHref}
          tabIndex={active ? 0 : -1}
          className={cn(
            "inline-flex items-center justify-center bg-ember-clay",
            isGlow ? "px-6 py-3 lg:px-8 lg:py-4" : "px-6 py-3",
            slide.ctaLabel2 && "rounded-full",
            "font-sans font-semibold text-paper",
            isGlow
              ? "text-[clamp(1rem,0.95rem+0.25vw,1.15rem)]"
              : "text-cta",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
            isDark
              ? "focus-visible:outline-oat-cream"
              : "focus-visible:outline-ink",
          )}
        >
          {slide.ctaLabel}
        </Link>
        {slide.ctaLabel2 && slide.ctaHref2 ? (
          <Link
            href={slide.ctaHref2}
            tabIndex={active ? 0 : -1}
            className={cn(
              "inline-flex items-center justify-center rounded-full border border-ink bg-transparent",
              isGlow ? "px-6 py-3 lg:px-8 lg:py-4" : "px-6 py-3",
              "font-sans font-semibold text-ink",
              isGlow
                ? "text-[clamp(1rem,0.95rem+0.25vw,1.15rem)]"
                : "text-cta",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
              isDark
                ? "focus-visible:outline-oat-cream"
                : "focus-visible:outline-ink",
            )}
          >
            {slide.ctaLabel2}
          </Link>
        ) : null}
      </div>

      {/* Mobile only — must not render in the text column on md+ */}
      <div className="mt-8 hidden w-full max-md:block">
        {active ? (
          <FuelGauge
            index={index}
            progressKey={progressKey}
            paused={paused}
            reducedMotion={reducedMotion}
            theme={slide.theme}
            onSelect={onSelect}
          />
        ) : null}
      </div>
    </div>
  );
}

function slideShellClass(active: boolean, reducedMotion: boolean) {
  return cn(
    "[grid-area:1/1] w-full",
    !reducedMotion && "transition-opacity ease-out",
    active ? "opacity-100 duration-300 z-10" : "pointer-events-none opacity-0 duration-200 z-0",
    reducedMotion && (active ? "opacity-100" : "pointer-events-none opacity-0"),
  );
}

/**
 * Slide 1 — restored to pre-redesign HeroSlideLifestyle:
 * full-bleed cover image, centered copy, yellow CTA. No collage strip markup.
 */
function FullBleedSlide({
  slide,
  active,
  priority,
  introReady,
  reducedMotion,
  index,
  progressKey,
  paused,
  onSelect,
}: {
  slide: Slide;
  active: boolean;
  priority?: boolean;
  introReady: boolean;
  reducedMotion: boolean;
  index: number;
  progressKey: number;
  paused: boolean;
  onSelect: (slideIndex: number) => void;
}) {
  return (
    <div
      className={cn(
        slideShellClass(active, reducedMotion),
        active &&
        "min-h-[clamp(560px,78vh,860px)] lg:min-h-[clamp(560px,78vh,860px)]",
      )}
      aria-hidden={!active}
      inert={!active ? true : undefined}
      role="group"
      aria-roledescription="slide"
      aria-label="Functional. Simple. Purposeful."
    >
      <div className="absolute inset-0">
        <HeroArtDirection
          slide={slide}
          priority={priority}
          sizesMobile="(max-width: 767px) 100vw, 1px"
          sizesDesktop="(min-width: 768px) 100vw, 1px"
        />
      </div>

      <div className="absolute inset-0 bg-foreground/45" aria-hidden />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
        <div
          className={cn(
            "flex max-w-3xl flex-col items-center",
            !reducedMotion &&
            "transition-[opacity,transform] duration-300 ease-out",
            !reducedMotion &&
            (introReady
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"),
          )}
        >
          <h1 className="font-display text-[clamp(2rem,5.5vw,4.25rem)] font-extrabold leading-[1.0] tracking-[-0.03em] text-white">
            Functional. Simple. Purposeful.
          </h1>
          <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
            FUEL YOUR MORNING. ELEVATE YOUR EVERYDAY.
          </p>
          <Link
            href="/products"
            tabIndex={active ? 0 : -1}
            className="mt-8 inline-flex h-12 items-center justify-center bg-[#f5c518] px-8 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Shop now
          </Link>

        </div>
      </div>

      {/* Mobile only — pinned to hero bottom, matching desktop shared gauge */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 w-[min(180px,calc(100%-3rem))] -translate-x-1/2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] md:hidden">
        <div className="pointer-events-auto">
          {active ? (
            <FuelGauge
              index={index}
              progressKey={progressKey}
              paused={paused}
              reducedMotion={reducedMotion}
              theme="dark"
              onSelect={onSelect}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SplitSlide({
  slide,
  active,
  introReady,
  reducedMotion,
  index,
  progressKey,
  paused,
  onSelect,
}: {
  slide: Slide;
  active: boolean;
  introReady: boolean;
  reducedMotion: boolean;
  index: number;
  progressKey: number;
  paused: boolean;
  onSelect: (slideIndex: number) => void;
}) {
  const panelBg =
    slide.theme === "light" ? "bg-oat-cream" : "bg-cocoa-espresso";

  return (
    <div
      className={slideShellClass(active, reducedMotion)}
      aria-hidden={!active}
      inert={!active ? true : undefined}
      role="group"
      aria-roledescription="slide"
      aria-label={slide.headline}
    >
      <div className="grid h-full min-h-[clamp(560px,78vh,860px)] grid-cols-1 lg:min-h-[clamp(560px,78vh,860px)] lg:grid-cols-[minmax(420px,38%)_1fr]">
        {/* Image first on mobile/tablet; right column on desktop — h-full, zero padding */}
        <div className="relative order-1 h-[min(100vw,32rem)] w-full p-0 md:h-[min(75vw,36rem)] lg:order-2 lg:h-full lg:min-h-0">
          <div className="relative h-full w-full">
            <HeroArtDirection
              slide={slide}
              sizesMobile="(max-width: 1023px) 100vw, 1px"
              sizesDesktop="(min-width: 1024px) 62vw, (min-width: 768px) 100vw, 1px"
            />
          </div>
        </div>

        <div
          className={cn(
            "order-2 flex items-center lg:order-1 lg:h-full",
            "p-4 md:p-8 lg:p-16 xl:p-24 2xl:p-[clamp(6rem,6vw,10rem)]",
            panelBg,
          )}
        >
          <SlideText
            slide={slide}
            active={active}
            introReady={introReady}
            reducedMotion={reducedMotion}
            index={index}
            progressKey={progressKey}
            paused={paused}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
}

function GlowSlide({
  slide,
  active,
  introReady,
  reducedMotion,
  index,
  progressKey,
  paused,
  onSelect,
}: {
  slide: Slide;
  active: boolean;
  introReady: boolean;
  reducedMotion: boolean;
  index: number;
  progressKey: number;
  paused: boolean;
  onSelect: (slideIndex: number) => void;
}) {
  const showGlow = slide.showGlow !== false;
  const flatCream = !showGlow;

  return (
    <div
      className={slideShellClass(active, reducedMotion)}
      data-product={slide.dataProduct}
      aria-hidden={!active}
      inert={!active ? true : undefined}
      role="group"
      aria-roledescription="slide"
      aria-label={slide.headline}
    >
      <div
        className={cn(
          "grid h-full min-h-[clamp(560px,78vh,860px)] grid-cols-1 lg:min-h-[clamp(560px,78vh,860px)] lg:grid-cols-[1fr_minmax(420px,44%)]",
          flatCream ? "bg-oat-cream" : "bg-product-background",
        )}
      >
        <div
          className={cn(
            "relative order-1 w-full overflow-hidden lg:order-2 lg:h-full lg:min-h-0",
            flatCream
              ? "h-[min(82vw,26rem)] md:h-[min(70vw,30rem)]"
              : "h-[min(90vw,28rem)]",
          )}
        >
          {showGlow ? (
            <div
              className="absolute inset-0"
              aria-hidden
              style={{
                background:
                  "radial-gradient(closest-side, var(--product-glow), transparent 70%)",
              }}
            />
          ) : null}
          <div
            className={cn(
              "relative h-full w-full",
              flatCream
                ? "p-3 md:p-6 lg:p-4 xl:p-6"
                : "p-8 md:p-12 lg:p-10 motion-safe:animate-float",
            )}
          >
            {slide.cutoutImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={slide.cutoutImage}
                  alt={slide.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 44vw, 90vw"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  className={
                    showGlow
                      ? "drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)]"
                      : undefined
                  }
                />
              </div>
            ) : null}
          </div>
        </div>

        <div
          className={cn(
            "order-2 flex items-center lg:order-1 lg:h-full",
            flatCream
              ? "p-5 md:p-10 lg:p-12 xl:p-16 2xl:p-[clamp(4rem,4vw,7rem)]"
              : "p-4 md:p-8 lg:p-10 xl:p-16 2xl:p-[clamp(4rem,4vw,7rem)]",
          )}
        >
          <SlideText
            slide={slide}
            variant="glow"
            active={active}
            introReady={introReady}
            reducedMotion={reducedMotion}
            index={index}
            progressKey={progressKey}
            paused={paused}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [introReady, setIntroReady] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const goTo = (next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
    setProgressKey((key) => key + 1);
  };

  const advance = useEffectEvent(() => {
    goTo(index + 1);
  });

  const autoplayPaused = paused || tabHidden || reducedMotion;

  useEffect(() => {
    if (autoplayPaused) return;
    const id = window.setTimeout(() => advance(), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [index, autoplayPaused, progressKey]);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    pointerStartX.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (pointerStartX.current === null) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  return (
    <section
      className="w-full"
      aria-label="Hero"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="relative isolate grid min-h-[clamp(560px,78vh,860px)] overflow-hidden bg-ink lg:min-h-[clamp(560px,78vh,860px)]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStartX.current = null;
        }}
      >
        {SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;
          const shared = {
            slide,
            active,
            introReady,
            reducedMotion,
            index,
            progressKey,
            paused: autoplayPaused,
            onSelect: goTo,
          };

          if (slide.layout === "full-bleed") {
            return (
              <FullBleedSlide
                key={slide.id}
                {...shared}
                priority={slideIndex === 0}
              />
            );
          }

          if (slide.layout === "glow") {
            return <GlowSlide key={slide.id} {...shared} />;
          }

          return <SplitSlide key={slide.id} {...shared} />;
        })}

        {/* Desktop: hero-level fuel gauge, centered at bottom of the band */}
        <div
          className={cn(
            "pointer-events-none absolute bottom-6 left-1/2 z-20 hidden w-[min(180px,calc(100%-3rem))] -translate-x-1/2 md:block",
            // Soft shadow keeps segments legible over slide 1 imagery
            "drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]",
          )}
        >
          <div className="pointer-events-auto">
            <FuelGauge
              index={index}
              progressKey={progressKey}
              paused={autoplayPaused}
              reducedMotion={reducedMotion}
              theme={SLIDES[index].theme}
              onSelect={goTo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
