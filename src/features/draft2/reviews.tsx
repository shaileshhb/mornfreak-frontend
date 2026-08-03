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

export function Draft2Reviews() {
  const [activeVideo, setActiveVideo] = useState<Review | null>(null);

  return (
    <section className="overflow-hidden bg-background py-20 sm:py-28">
      <Container className="max-w-[90rem]">
        <header className="text-center">
          <div className="flex justify-center gap-1 text-foreground" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} aria-hidden size={17} fill="currentColor" />
            ))}
          </div>
          <p className="mt-3 font-sans text-xs font-bold uppercase tracking-[0.18em]">
            5.0 Stars <span className="mx-2 text-foreground/30">|</span> 10K+ Reviews
          </p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-none tracking-wide sm:text-7xl">
            The <span className="italic underline decoration-2 underline-offset-8">reviews</span> are
            in!
          </h2>
        </header>

        <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-5">
          {REVIEWS.map((review) =>
            review.videoUrl ? (
              <VideoReviewCard
                key={review.id}
                review={review}
                onPlay={() => setActiveVideo(review)}
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
              <Icon aria-hidden className="shrink-0 text-foreground" size={22} strokeWidth={1.7} />
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
          <div
            className="relative w-full max-w-3xl bg-black"
            onClick={(event) => event.stopPropagation()}
          >
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
    <div className="flex gap-0.5 text-foreground" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} aria-hidden size={14} fill="currentColor" />
      ))}
    </div>
  );
}

function ProductFooter({ review }: { review: Review }) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg bg-white px-3 py-2.5">
      {review.productImage && (
        <div className="relative h-10 w-10 shrink-0 overflow-hidden">
          <Image src={review.productImage} alt="" fill sizes="40px" className="object-cover" />
        </div>
      )}
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-foreground/70">
        Review for: {review.productLabel}
      </p>
    </div>
  );
}

function TextReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex min-h-[31rem] w-[19rem] shrink-0 snap-start flex-col rounded-2xl bg-white p-6 sm:w-[21rem]">
      <Stars rating={review.rating} />
      <h3 className="mt-6 font-display text-3xl uppercase leading-none tracking-wide">
        {review.title}
      </h3>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
      <div className="border-t border-foreground/10 pt-5">
        <div>
          <p className="font-sans text-sm font-bold">{review.name}</p>
          {review.verified && (
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle2 aria-hidden size={13} /> Verified Buyer
            </p>
          )}
        </div>
        <ProductFooter review={review} />
      </div>
    </article>
  );
}

function VideoReviewCard({ review, onPlay }: { review: Review; onPlay: () => void }) {
  return (
    <article className="relative min-h-[31rem] w-[19rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-[#2a0e0c] text-white sm:w-[21rem]">
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
        <p className="text-sm leading-snug text-white/90">{review.title}</p>
        <button
          type="button"
          aria-label={`Play ${review.name}'s video review`}
          onClick={onPlay}
          className="m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-foreground transition-transform hover:scale-105"
        >
          <Play aria-hidden className="ml-1" size={25} fill="currentColor" />
        </button>
        <div>
          <p className="font-sans text-sm font-bold">{review.name}</p>
          {review.verified && (
            <p className="mt-1 flex items-center gap-1 text-xs text-white/65">
              <CheckCircle2 aria-hidden size={13} /> Verified Buyer
            </p>
          )}
          <ProductFooter review={review} />
        </div>
      </div>
    </article>
  );
}
