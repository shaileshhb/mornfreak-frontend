"use client";

import {
  FlaskConical,
  Lightbulb,
  MessageCircleQuestion,
  Sunrise,
  UsersRound,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { useInView } from "@/hooks/use-in-view";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/cn";

const MILESTONES = [
  {
    number: "01",
    year: "2025",
    title: "The problem",
    body: "Healthy breakfasts became complicated. Most options are packed with processed ingredients, hidden sugars, and fall short on real nutrition. We knew there had to be a better way.",
    icon: MessageCircleQuestion,
  },
  {
    number: "02",
    year: "2025",
    title: "The idea",
    body: "What if breakfast could be clean, functional, delicious, and actually keep you satisfied? Not another cereal. A complete morning routine in one bowl.",
    icon: Lightbulb,
  },
  {
    number: "03",
    year: "2026",
    title: "The formula",
    body: "We combined science, nutrition, and clean ingredients. No junk. No shortcuts. Just real food nutrition that is backed by science. High in protein, prebiotics, superfoods and taste.",
    icon: FlaskConical,
  },
  {
    number: "04",
    year: "Now",
    title: "The movement",
    body: "Today, Mornfreak is becoming a community of people who refuse to compromise their mornings. Because healthy mornings create better lives.",
    icon: UsersRound,
  },
] as const;

type Milestone = (typeof MILESTONES)[number];

function MilestoneItem({
  number,
  year,
  title,
  body,
  icon: Icon,
  index,
}: Milestone & { index: number }) {
  const [ref, inView] = useInView<HTMLLIElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <li
      ref={ref}
      className={cn(
        "group/item relative flex gap-5 pt-8 first:pt-0 sm:gap-6",
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
        inView
          ? "motion-safe:translate-y-0 motion-safe:opacity-100"
          : "motion-safe:translate-y-4 motion-safe:opacity-0",
      )}
      style={{
        transitionDelay: inView ? `${index * 80}ms` : "0ms",
      }}
    >
      <div className="relative flex w-9 shrink-0 justify-center self-stretch">
        <span
          className={cn(
            "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold tracking-wide text-white transition-colors duration-500",
            inView ? "bg-primary" : "bg-foreground",
          )}
        >
          {number}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 gap-4 border-b border-foreground/12 pb-8 group-last/item:border-b-0 group-last/item:pb-0 sm:gap-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary">
          <Icon aria-hidden size={20} strokeWidth={1.7} />
        </span>
        <div>
          <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
            {year}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight tracking-wide sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            {body}
          </p>
        </div>
      </div>
    </li>
  );
}

export function StoryTimeline() {
  const [listRef, progress] = useScrollProgress<HTMLOListElement>({ anchor: 0.5 });

  return (
    <section id="our-beginning" className="scroll-mt-24 bg-card py-20 sm:py-28">
      <Container className="max-w-[82rem]">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Sunrise aria-hidden className="text-orange" size={28} strokeWidth={1.7} />
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2.75rem,5vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-wide">
              WE BELIEVE <span>MORNINGS</span> CHANGE EVERYTHING.
            </h2>
            <div className="mt-5 h-[2px] w-12 bg-primary" aria-hidden />
            <div className="mt-7 max-w-lg space-y-4 font-sans text-base leading-relaxed text-muted-foreground">
              <p>The first fuel of your day shapes the rest of your health.</p>
              <p>
                We millions of people begin every morning rushing, skipping breakfast, or
                settling for foods loaded with sugar and empty calories.
              </p>
              <p>
                We started <span className="text-primary">Mornfreak</span> because we belive
                breakfast should power the mission you chase, not slow it down.
              </p>
            </div>
            <p className="mt-7 font-sans text-base font-bold italic leading-relaxed text-primary">
              Instead, it should become your biggest advantage.
            </p>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute top-[1.125rem] bottom-[1.125rem] left-[1.125rem] w-px -translate-x-1/2 bg-foreground/15"
              aria-hidden
            >
              <div
                className="w-full origin-top bg-primary motion-safe:transition-[height] motion-safe:duration-150 motion-safe:ease-out"
                style={{ height: `${progress * 100}%` }}
              />
            </div>

            <ol ref={listRef}>
              {MILESTONES.map((milestone, index) => (
                <MilestoneItem key={milestone.number} {...milestone} index={index} />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
