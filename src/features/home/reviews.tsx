"use client";

import {
  CheckCircle2,
  Dumbbell,
  Leaf,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Container } from "@/components/ui/container";

import { REVIEWS, type Review } from "./reviews-data";

const TRUST_POINTS = [
  { label: "Clean Ingredients", icon: Leaf },
  { label: "High Protein", icon: Dumbbell },
  { label: "No Added Sugar", icon: ShieldCheck },
  { label: "Made for Real Results", icon: Sparkles },
] as const;

export function Reviews() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="overflow-hidden bg-background py-20 sm:py-28">
      <Container className="max-w-[90rem]">
        <header className="text-center">
          <div className="flex justify-center gap-1 text-primary" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} aria-hidden size={17} fill="currentColor" />
            ))}
          </div>
          <p className="mt-3 font-sans text-xs font-bold uppercase tracking-[0.18em]">
            5.0 Stars <span className="mx-2 text-foreground/30">|</span> Early customer reviews
          </p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-none tracking-wide sm:text-7xl">
            The reviews are in!
          </h2>
        </header>

        <div className="mt-12 flex snap-x gap-5 overflow-x-auto scrollbar-hide">
          {REVIEWS.map((review) =>
            review.videoUrl ? (
              <VideoReviewCard
                key={review.id}
                review={review}
                isPlaying={playingId === review.id}
                onToggle={() =>
                  setPlayingId((current) => (current === review.id ? null : review.id))
                }
              />
            ) : (
              <TextReviewCard key={review.id} review={review} />
            ),
          )}
        </div>

        <div className="mt-12 grid grid-cols-2 border-y border-foreground/15 md:grid-cols-4">
          {TRUST_POINTS.map(({ label, icon: Icon }, index) => (
            <div
              key={label}
              className={`flex min-h-28 items-center justify-center gap-3 px-3 py-5 text-center ${
                index > 0 ? "md:border-l md:border-foreground/15" : ""
              }`}
            >
              <Icon aria-hidden className="shrink-0 text-primary" size={22} strokeWidth={1.7} />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.1em]">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-primary" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} aria-hidden size={14} fill="currentColor" />
      ))}
    </div>
  );
}

function Reviewer({ review, inverse = false }: { review: Review; inverse?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-sans text-sm font-bold">{review.name}</p>
        {review.verified && (
          <p className={`mt-1 flex items-center gap-1 text-xs ${inverse ? "text-white/65" : "text-muted-foreground"}`}>
            <CheckCircle2 aria-hidden size={13} /> Verified buyer
          </p>
        )}
      </div>
      {review.productImage && (
        <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-white">
          <Image src={review.productImage} alt="" fill sizes="48px" className="object-cover" />
        </div>
      )}
    </div>
  );
}

function TextReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex min-h-[31rem] w-[19rem] shrink-0 snap-start flex-col rounded-2xl bg-card p-6 sm:w-[21rem]">
      <Stars rating={review.rating} />
      <h3 className="mt-6 font-display text-3xl uppercase leading-none tracking-wide">{review.title}</h3>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
      <div className="border-t border-foreground/15 pt-5">
        <Reviewer review={review} />
        <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary">
          Review for: {review.productLabel}
        </p>
      </div>
    </article>
  );
}

function VideoReviewCard({
  review,
  isPlaying,
  onToggle,
}: {
  review: Review;
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.currentTime = 0;
      void video.play();
    }
    onToggle();
  };

  return (
    <article className="group relative min-h-[31rem] w-[19rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-foreground text-white sm:w-[21rem]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={review.videoUrl}
        playsInline
        preload="metadata"
        loop
        onEnded={onToggle}
      >
        Your browser does not support embedded video.
      </video>
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/90 transition-opacity duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-60" : "opacity-100"
        }`}
      />
      <div className="relative z-10 flex h-full min-h-[31rem] flex-col p-6">
        <div className={`transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
          <Stars rating={review.rating} />
          <h3 className="mt-5 font-display text-3xl uppercase leading-none tracking-wide">{review.title}</h3>
        </div>
        <button
          type="button"
          aria-label={isPlaying ? `Pause ${review.name}'s video review` : `Play ${review.name}'s video review`}
          onClick={handleToggle}
          className={`m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary transition-transform hover:scale-105 ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          {isPlaying ? (
            <Pause aria-hidden size={22} fill="currentColor" />
          ) : (
            <Play aria-hidden className="ml-1" size={25} fill="currentColor" />
          )}
        </button>
        <div
          className={`border-t border-white/20 pt-5 transition-opacity duration-300 ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          <Reviewer review={review} inverse />
          <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-orange">
            Review for: {review.productLabel}
          </p>
        </div>
      </div>
    </article>
  );
}
