import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Dumbbell,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import { getImageProps } from "next/image";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

import { StoryTimeline } from "./story-timeline";

const AUDIENCES = [
  {
    title: "HEALTH CONSCIOUS FAMILIES",
    body: "Because healthly eating starts at home.",
    icon: Dumbbell,
  },
  {
    title: "BUSY STUDENTS & ENTREPRENEURS",
    body: "You don't always have time to make breakfast, but you know it's important.",
    icon: GraduationCap,
  },
  {
    title: "CORPORATE PROFESSIONALS",
    body: "Long meetings. Tough deadlines. We get it.",
    icon: BriefcaseBusiness,
  },
  {
    title: "FITNESS ENTHUSIASTS",
    body: "Your body deserves a good start to the day.",
    icon: HeartPulse,
  },
] as const;

function StoryHeroImage() {
  const alt = "A person holding a mug while watching the sun rise over the mountains";
  const common = {
    alt,
    sizes: "100vw",
  } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: "/images/our-story/person_with_mug_2.png",
    width: 1983,
    height: 793,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    src: "/images/our-story/person_with_mug_mobile_2.png",
    width: 1122,
    height: 1402,
    priority: true,
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <img
        {...mobileProps}
        alt={alt}
        srcSet={mobileSrcSet}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
  );
}

function StoryHero() {
  return (
    <section
      className="relative isolate flex min-h-[42rem] items-start overflow-hidden bg-foreground md:min-h-[38rem] md:items-center lg:min-h-[42rem]"
      aria-labelledby="our-story-title"
    >
      <StoryHeroImage />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,17,9,.88)_0%,rgba(30,17,9,.50)_48%,rgba(30,17,9,.12)_78%)] md:bg-[linear-gradient(90deg,rgba(30,17,9,.90)_0%,rgba(30,17,9,.72)_35%,rgba(30,17,9,.18)_66%,rgba(30,17,9,.04)_100%)]"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-foreground/35 to-transparent" aria-hidden />

      <Container className="relative z-10 w-full max-w-[90rem] py-16 sm:py-20 lg:px-10">
        <div className="max-w-2xl text-white">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-orange">
            Our story
          </p>
          <h1
            id="our-story-title"
            className="mt-5 max-w-2xl font-display text-[clamp(3rem,6.5vw,6.25rem)] uppercase leading-[0.9] tracking-[0.01em]"
          >
            <p>Great days</p>
            <p>Start here</p>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-white/80 sm:text-lg">
            We aren't just making breakfast. We're building a movement for people who believe every great day starts with a <em className="font-bold">great morning</em>.
          </p>
          <a
            href="#our-beginning"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 border border-white/45 px-6 font-sans text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            Read our story <ArrowDown aria-hidden size={16} />
          </a>
        </div>
      </Container>
    </section>
  );
}

function BuiltForMornings() {
  return (
    <section className="bg-background py-20 sm:py-24" aria-labelledby="built-for-title">
      <Container className="max-w-[82rem]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-primary">
            WHO WE BUILT THIS FOR
          </p>
          <h2
            id="built-for-title"
            className="mt-4 font-display text-[clamp(2.5rem,5vw,4.25rem)] uppercase leading-[0.95] tracking-wide"
          >
            THIS IS FOR YOU IF
          </h2>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(({ title, body, icon: Icon }) => (
            <article key={title} className="border-t border-foreground/20 pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon aria-hidden size={21} strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 font-sans text-base font-bold uppercase tracking-[0.06em]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BreakfastCta() {
  return (
    <section className="bg-card py-16 sm:py-20">
      <Container className="max-w-[82rem]">
        <div className="grid grid-cols-1 overflow-hidden bg-foreground shadow-lg lg:min-h-[30rem] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex min-w-0 items-center px-6 py-12 text-white sm:px-10 lg:px-14">
            <div className="w-full min-w-0 max-w-md">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-orange">
                Fuel your start
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.75rem,5vw,4.75rem)] uppercase leading-[0.92] tracking-wide">
                Better morning. Better You.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70 mb-0">
                Real ingredients. Real nutrition.
              </p>
              <p className="text-base leading-relaxed text-white/70">
                Real results. Every single morning
              </p>
              <Link
                href="/products"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-orange px-7 font-sans text-xs font-bold uppercase tracking-[0.15em] text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              >
                Shop Mornfreak <ArrowRight aria-hidden size={17} />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] min-h-[20rem] min-w-0 w-full overflow-hidden lg:aspect-auto">
            <Image
              src="/images/science-oats-bowl.jpg"
              alt="A chocolate oat bowl topped with fruit, nuts, seeds and dark chocolate"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function OurStoryPage() {
  return (
    <>
      <StoryHero />
      <StoryTimeline />
      <BuiltForMornings />
      <BreakfastCta />
    </>
  );
}
