"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { cn } from "@/lib/cn";

import img1Desktop from "../../../public/images/hero/img_1_desktop.avif";
import img1Mobile from "../../../public/images/hero/img_1_mobile.png";
import img2Desktop from "../../../public/images/hero/img_2_desktop.png";
import img2Mobile from "../../../public/images/hero/img_2_mobile.png";
import img3Desktop from "../../../public/images/img_3_desktop.avif";
import img3Mobile from "../../../public/images/img_3_mobile.png";

interface Slide {
  id: string;
  kicker: string;
  headline: string;
  body?: string;
  rating?: string;
  ctaLabel: string;
  ctaHref: string;
  imageDesktop: StaticImageData;
  imageMobile: StaticImageData;
  imageAlt: string;
  theme: "light" | "dark";
  layout: "full-bleed" | "split";
  /**
   * Product shots with tight framing (no spare margin) should use contain +
   * toasted-almond panel. Current oats/PB assets have enough margin for cover.
   */
  objectFit: "cover" | "contain";
  objectPositionMobile?: string;
  objectPositionDesktop?: string;
}

const SLIDES: Slide[] = [
  {
    id: "lifestyle",
    kicker: "Fuel your morning",
    headline: "Functional. Simple. Purposeful.",
    ctaLabel: "Shop now",
    ctaHref: "/products",
    imageDesktop: img1Desktop,
    imageMobile: img1Mobile,
    imageAlt:
      "People fueling their mornings with Mornfreak — eating, commuting, training, and studying",
    theme: "dark",
    layout: "full-bleed",
    objectFit: "cover",
    objectPositionMobile: "center",
    objectPositionDesktop: "center",
  },
  {
    id: "protein-oats",
    kicker: "Protein oats",
    headline: "Fuel your day. Feed your goals.",
    body: "Rich chocolate oats with 26g protein, super seeds, nuts and prebiotics — no added sugar.",
    rating: "5.0 stars — loved by early tasters",
    ctaLabel: "Shop Protein Oats",
    ctaHref: "/products/protein-oats",
    imageDesktop: img2Desktop,
    imageMobile: img2Mobile,
    imageAlt:
      "Mornfreak Protein Oats pouches with a bowl of rich chocolate oats and fresh toppings",
    theme: "light",
    layout: "split",
    objectFit: "cover",
    // Portrait mobile crop: product cluster is mid-frame.
    objectPositionMobile: "center",
    // Landscape → tall column: keep pouch + bowl, bias slightly right.
    objectPositionDesktop: "62% center",
  },
  {
    id: "peanut-butter",
    kicker: "Peanut butter powder",
    headline: "Good morning. Great choice.",
    body: "Real peanuts. Real nutrition. A smarter spread for a stronger, healthier you.",
    rating: "Clean ingredients. Nothing to hide.",
    ctaLabel: "Shop Peanut Butter",
    ctaHref: "/products/peanut-butter-powder",
    imageDesktop: img3Desktop,
    imageMobile: img3Mobile,
    imageAlt:
      "Mornfreak peanut butter powder jar with peanuts and a bowl of peanut powder",
    theme: "dark",
    layout: "split",
    objectFit: "cover",
    // Portrait mobile: jar sits mid-frame with yellow/blue margins.
    objectPositionMobile: "center",
    // Landscape → tall column: jar is center-right; keep jar + badges in frame.
    objectPositionDesktop: "72% center",
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
  const isDark = slide.theme === "dark";

  return (
    <div
      className={cn(
        "flex w-full max-w-[42ch] flex-col",
        "motion-reduce:translate-y-0",
        !reducedMotion && "transition-[opacity,transform] ease-out",
        active
          ? "translate-y-0 opacity-100 duration-300"
          : "pointer-events-none translate-y-3 opacity-0 duration-200",
      )}
    >
      <p
        className={cn(
          "font-display text-kicker font-semibold uppercase",
          isDark ? "text-oat-cream/80" : "text-ink/70",
        )}
      >
        {slide.kicker}
      </p>

      <h2
        className={cn(
          "mt-3 font-display text-h1 font-bold",
          isDark ? "text-paper" : "text-ink",
        )}
      >
        {slide.headline}
      </h2>

      {slide.body ? (
        <p
          className={cn(
            "mt-4 font-body text-body font-normal",
            isDark ? "text-oat-cream/85" : "text-ink/80",
          )}
        >
          {slide.body}
        </p>
      ) : null}

      {slide.rating ? (
        <p
          className={cn(
            "mt-4 font-accent text-body italic",
            isDark ? "text-toasted-almond" : "text-cocoa-espresso",
          )}
        >
          {slide.rating}
        </p>
      ) : null}

      <div className="mt-6">
        <Link
          href={slide.ctaHref}
          tabIndex={active ? 0 : -1}
          className={cn(
            "inline-flex items-center justify-center bg-ember-clay px-6 py-3",
            "font-display text-cta font-semibold text-paper",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
            isDark
              ? "focus-visible:outline-oat-cream"
              : "focus-visible:outline-ink",
          )}
        >
          {slide.ctaLabel}
        </Link>
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
    // Active slide sets height below lg; all slides fill the fixed band at lg+.
    active ? "relative z-10 lg:absolute lg:inset-0" : "absolute inset-0 z-0",
    !reducedMotion && "transition-opacity ease-out",
    active
      ? "opacity-100 duration-300"
      : "pointer-events-none opacity-0 duration-200",
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
        active && "min-h-[clamp(560px,78vh,860px)] lg:min-h-0",
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

      <div className="relative z-10 flex h-full items-center justify-center px-6 pb-20 pt-16 text-center">
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
          <h1 className="font-display text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            Functional. Simple. Purposeful.
          </h1>
          <p className="mt-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
            FUEL YOUR MORNING. ELEVATE YOUR EVERYDAY.
          </p>
          <Link
            href="/products"
            tabIndex={active ? 0 : -1}
            className="mt-8 inline-flex h-12 items-center justify-center bg-[#f5c518] px-8 font-sans text-sm font-bold uppercase tracking-[0.14em] text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
      <div className="grid h-full min-h-[clamp(560px,78vh,860px)] grid-cols-1 lg:min-h-0 lg:grid-cols-[minmax(420px,38%)_1fr]">
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
        className="relative isolate min-h-[clamp(560px,78vh,860px)] overflow-hidden bg-ink lg:h-[clamp(560px,78vh,860px)] lg:min-h-0"
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
