"use client";

import {
  CheckCircle2,
  Dumbbell,
  Leaf,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/ui/container";

import { REVIEWS, type Review } from "./reviews-data";

const TRUST_POINTS = [
  { label: "Clean Ingredients", icon: Leaf },
  { label: "High Protein", icon: Dumbbell },
  { label: "No Added Sugar", icon: ShieldCheck },
  { label: "Made for Real Results", icon: Sparkles },
] as const;

export function Reviews() {
  const [activeVideo, setActiveVideo] = useState<Review | null>(null);

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

        <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-5">
          {REVIEWS.map((review) =>
            review.videoUrl ? (
              <VideoReviewCard key={review.id} review={review} onPlay={() => setActiveVideo(review)} />
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

      {activeVideo?.videoUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.name} video review`}
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-3xl bg-black" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground"
              aria-label="Close video"
              onClick={() => setActiveVideo(null)}
            >
              <X aria-hidden size={20} />
            </button>
            <video
              className="max-h-[82vh] w-full"
              src={activeVideo.videoUrl}
              poster={activeVideo.videoPoster}
              controls
              autoPlay
            >
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
      )}
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
    <article className="flex min-h-[31rem] w-[19rem] shrink-0 snap-start flex-col bg-[#fff9ef] p-6 sm:w-[21rem]">
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

function VideoReviewCard({ review, onPlay }: { review: Review; onPlay: () => void }) {
  return (
    <article className="relative min-h-[31rem] w-[19rem] shrink-0 snap-start overflow-hidden bg-[#2a0e0c] text-white sm:w-[21rem]">
      {review.videoPoster && (
        <Image
          src={review.videoPoster}
          alt=""
          fill
          sizes="336px"
          className="object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/90" />
      <div className="relative z-10 flex h-full min-h-[31rem] flex-col p-6">
        <Stars rating={review.rating} />
        <h3 className="mt-5 font-display text-3xl uppercase leading-none tracking-wide">{review.title}</h3>
        <button
          type="button"
          aria-label={`Play ${review.name}'s video review`}
          onClick={onPlay}
          className="m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary transition-transform hover:scale-105"
        >
          <Play aria-hidden className="ml-1" size={25} fill="currentColor" />
        </button>
        <div className="border-t border-white/20 pt-5">
          <Reviewer review={review} inverse />
          <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#ffc65c]">
            Review for: {review.productLabel}
          </p>
        </div>
      </div>
    </article>
  );
}
