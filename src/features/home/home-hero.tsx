"use client";

import {
  ArrowRight,
  BatteryCharging,
  CandyOff,
  Dumbbell,
  Leaf,
  ShieldCheck,
  Sprout,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { cn } from "@/lib/cn";

const SLIDE_COUNT = 3;
const AUTO_MS = 5000;
const SWIPE_THRESHOLD = 48;

function HeroPicture({
  desktopSrc,
  mobileSrc,
  alt,
  priority,
  sizes,
  className,
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <>
      <Image
        src={mobileSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover object-center lg:hidden", className)}
      />
      <Image
        src={desktopSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("hidden object-cover object-center lg:block", className)}
      />
    </>
  );
}

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
    setProgressKey((key) => key + 1);
  }, []);

  const advance = useEffectEvent(() => {
    goTo(index + 1);
  });

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setTimeout(() => advance(), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reducedMotion, progressKey]);

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
      className="w-full px-3 pt-3 sm:px-4 sm:pt-4"
      aria-label="Hero"
      aria-roledescription="carousel"
      // onMouseEnter={() => setPaused(true)}
      // onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="relative isolate min-h-[calc(100svh-8.5rem)] overflow-hidden rounded-[1.75rem] bg-foreground shadow-md"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStartX.current = null;
        }}
      >
        <div className="absolute inset-0">
          <HeroSlideLifestyle active={index === 0} />
          <HeroSlideOats active={index === 1} />
          <HeroSlidePeanutButter active={index === 2} />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/45 via-black/15 to-transparent pt-16"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 p-5 sm:p-7 lg:p-9">
          <div className="pointer-events-auto flex w-full max-w-xs flex-col gap-3">
            <div className="flex gap-2" role="tablist" aria-label="Hero slides">
              {Array.from({ length: SLIDE_COUNT }).map((_, slideIndex) => {
                const isActive = slideIndex === index;
                return (
                  <button
                    key={slideIndex}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${slideIndex + 1}`}
                    onClick={() => goTo(slideIndex)}
                    className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/35"
                  >
                    <span
                      key={isActive ? `${progressKey}-${slideIndex}` : `idle-${slideIndex}`}
                      className={cn(
                        "absolute inset-y-0 left-0 w-full origin-left rounded-full bg-white",
                        isActive && !reducedMotion && "animate-hero-progress",
                        isActive && !reducedMotion && paused && "[animation-play-state:paused]",
                        isActive && reducedMotion && "scale-x-100",
                        !isActive && "scale-x-0",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSlideLifestyle({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-700 ease-out",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!active}
      inert={!active ? true : undefined}
      role="group"
      aria-roledescription="slide"
      aria-label="Functional. Simple. Purposeful."
    >
      <HeroPicture
        mobileSrc="/images/hero/img_1_mobile.png"
        desktopSrc="/images/hero/img_1_desktop.avif"
        alt="People fueling their mornings with Mornfreak — eating, commuting, training, and studying"
        priority={active}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-foreground/45" />
      <div className="relative z-10 flex h-full items-center justify-center px-6 pb-20 pt-16 text-center">
        <div className="flex max-w-3xl flex-col items-center">
          <h1 className="font-display text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            Functional. Simple. Purposeful.
          </h1>
          <p className="mt-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
            FUEL YOUR MORNING. ELEVATE YOUR EVERYDAY.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex h-12 items-center justify-center bg-[#f5c518] px-8 font-sans text-sm font-bold uppercase tracking-[0.14em] text-foreground transition-transform hover:-translate-y-0.5"
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroSlideOats({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[linear-gradient(135deg,#5c4030_0%,#3a2418_55%,#1e1109_100%)] transition-opacity duration-700 ease-out",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!active}
      inert={!active ? true : undefined}
      role="group"
      aria-roledescription="slide"
      aria-label="Fuel your day. Feed your goals."
    >
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[90rem] flex-col gap-2 overflow-hidden px-4 pb-14 pt-10 sm:gap-3 sm:px-6 sm:pb-16 sm:pt-12 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-20">
        <div className="w-full shrink-0 lg:w-[42%] lg:max-w-[26rem] xl:max-w-xl">
          <h1 className="font-display text-[clamp(2rem,8vw,5.25rem)] uppercase italic leading-[0.9] tracking-tight text-white">
            Fuel your day.
            <span className="mt-1 block text-orange sm:mt-2">Feed your goals.</span>
          </h1>
          <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-base lg:mt-5 lg:text-lg">
            Rich chocolate oats with 26g protein, super seeds, nuts and prebiotics.
            Built for powerful mornings without added sugar or preservatives.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-4 lg:mt-8">
            <Link
              href="/products"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-orange px-5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-transform hover:-translate-y-0.5 sm:h-12 sm:px-7 sm:text-sm"
            >
              Shop now <ArrowRight aria-hidden size={17} />
            </Link>
            <p className="flex items-center gap-2 font-sans text-xs font-medium text-white sm:text-sm">
              <span className="flex gap-0.5 text-orange" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} aria-hidden size={14} fill="currentColor" />
                ))}
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.12em]">
                5.0 Stars <span className="mx-1 text-white/40">|</span> Loved by early tasters
              </span>
            </p>
          </div>
        </div>

        <div className="relative min-h-0 w-full flex-1 lg:h-full">
          <div className="relative h-full w-full min-h-[14rem] sm:min-h-[18rem] lg:min-h-[18rem]">
            <Image
              src="/images/raising-the-bar/protein_oats.png"
              alt="Mornfreak Protein Oats – Rich Chocolate flavour, 425g pouch with 26g protein, super seeds & nuts"
              fill
              priority={active}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rotate-[8deg] scale-[0.88] object-contain object-bottom lg:object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const PEANUT_STATS = [
  { value: "87%", label: "LESS CALORIES*" },
  { value: "HIGH", label: "PROTEIN" },
  { value: "1/3", label: "LESS FAT*" },
] as const;

function PeanutStatBadge({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#f5c518] bg-[#001d4a] px-2 text-center shadow-md lg:size-24">
      <span className="font-display text-xl font-bold leading-none tracking-tight text-[#f5c518] lg:text-2xl">
        {value}
      </span>
      <span className="mt-0.5 max-w-full font-sans text-[0.58rem] font-bold uppercase leading-tight tracking-wide text-white lg:text-[0.65rem]">
        {label}
      </span>
    </div>
  );
}

// Previous flattened slide assets (not rendered):
function HeroSlidePeanutButter({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[linear-gradient(135deg,#fff8dc_0%,#ffe9a8_55%,#ffd978_100%)] transition-opacity duration-700 ease-out",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!active}
      inert={!active ? true : undefined}
      role="group"
      aria-roledescription="slide"
      aria-label="Good morning. Great choice."
    >
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[90rem] flex-col gap-2 overflow-hidden px-4 pb-14 pt-10 sm:gap-3 sm:px-6 sm:pb-16 sm:pt-12 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-20">
        <div className="w-full shrink-0 lg:w-[42%] lg:max-w-[26rem] xl:max-w-xl">
          <h1 className="font-display text-[clamp(2rem,8vw,5.25rem)] font-bold uppercase leading-[0.9] tracking-tight text-[#001d4a]">
            Good morning.
          </h1>
          <p className="mt-0.5 font-script text-[clamp(1.65rem,5.5vw,3.75rem)] leading-none text-[#f39c12]">
            Great Choice.
          </p>
          <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-[#001d4a] sm:mt-4 sm:text-base lg:mt-5 lg:text-lg">
            Real oats. Real nutrition.
            <br />
            A smarter choice for a stronger, healthier you.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-4 lg:mt-8">
            <Link
              href="/products"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#001d4a] px-5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5 sm:h-12 sm:px-7 sm:text-sm"
            >
              Shop now <ArrowRight aria-hidden size={17} />
            </Link>
            <p className="flex items-center gap-2 font-sans text-xs font-medium text-[#001d4a] sm:text-sm">
              <ShieldCheck aria-hidden size={16} className="shrink-0 text-[#001d4a] sm:size-[18px]" />
              Clean Ingredients. Nothing to Hide.
            </p>
          </div>

          {/* <div className="mt-4 flex justify-center gap-3 sm:mt-5 sm:gap-4 lg:hidden" aria-label="Product highlights">
            {PEANUT_STATS.map((stat) => (
              <PeanutStatBadge key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div> */}
        </div>

        <div className="relative min-h-0 w-full flex-1 lg:h-full">
          <div className="relative h-full w-full lg:min-h-[18rem]">
            <Image
              src="/images/raising-the-bar/peanut_butter_powder.png"
              alt="Mornfreak peanut butter powder jar with peanuts, leaves, and powder bowl"
              fill
              priority={active}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-bottom lg:object-center"
            />

            {/* <div
              className="pointer-events-none absolute inset-y-[10%] right-2 z-10 hidden flex-col justify-between lg:flex xl:right-3"
              aria-hidden
            >
              {PEANUT_STATS.map((stat) => (
                <PeanutStatBadge key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
