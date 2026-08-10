"use client";

import { CheckCircle2, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/cn";

import type { ProductReview, ProductReviews } from "./types";
import { formatReviewDate } from "./utils";

const INITIAL_VISIBLE = 5;

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-primary" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden
          size={size}
          fill={index < rating ? "currentColor" : "none"}
          className={index < rating ? "" : "text-foreground/20"}
        />
      ))}
    </div>
  );
}

type ProductReviewCardProps = {
  review: ProductReview;
};

export function ProductReviewCard({ review }: ProductReviewCardProps) {
  return (
    <article className="flex flex-col rounded-2xl bg-card p-6">
      <Stars rating={review.rating} />
      {review.title && (
        <h3 className="mt-5 font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
          {review.title}
        </h3>
      )}
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {review.body}
      </p>
      <div className="mt-6 border-t border-foreground/15 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-sans text-sm font-bold">{review.author}</p>
            {review.verified && (
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <CheckCircle2 aria-hidden size={13} /> Verified buyer
              </p>
            )}
          </div>
          <time
            dateTime={review.date}
            className="font-sans text-xs text-muted-foreground"
          >
            {formatReviewDate(review.date)}
          </time>
        </div>
      </div>
    </article>
  );
}

function RatingsBreakdown({ items }: { items: ProductReview[] }) {
  const counts = useMemo(() => {
    const next = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const item of items) {
      const key = Math.min(5, Math.max(1, Math.round(item.rating))) as
        | 1
        | 2
        | 3
        | 4
        | 5;
      next[key] += 1;
    }
    return next;
  }, [items]);

  const total = items.length || 1;

  return (
    <div className="mt-6 w-full max-w-sm space-y-2" aria-label="Ratings breakdown">
      {([5, 4, 3, 2, 1] as const).map((stars) => {
        const count = counts[stars];
        const pct = Math.round((count / total) * 100);
        return (
          <div key={stars} className="flex items-center gap-3 text-xs">
            <span className="w-10 shrink-0 font-sans tabular-nums text-foreground/70">
              {stars}★
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right tabular-nums text-foreground/50">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

type ProductReviewsSectionProps = {
  reviews: ProductReviews;
  productName: string;
};

export function ProductReviewsSection({
  reviews,
  productName,
}: ProductReviewsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleReviews = reviews.items.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.items.length;

  if (reviews.count === 0 || reviews.items.length === 0) {
    return (
      <section id="reviews" className="scroll-mt-24 bg-background py-16 sm:py-20 lg:py-24">
        <Container>
          <Heading variant="h2" as="h2">
            Reviews
          </Heading>
          <p className="mt-4 font-sans text-sm text-muted-foreground">
            No reviews yet for {productName}. Be the first to share your take once
            we launch.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section id="reviews" className="scroll-mt-24 bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="flex flex-col gap-6 border-b border-foreground/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-foreground/50">
              Customer reviews
            </p>
            <Heading variant="h2" as="h2" className="mt-3">
              The reviews are in
            </Heading>
            <div className="mt-5 flex flex-wrap items-end gap-4">
              <p className="font-display text-5xl leading-none tracking-wide tabular-nums">
                {reviews.averageRating.toFixed(1)}
              </p>
              <div className="pb-1">
                <Stars rating={Math.round(reviews.averageRating)} size={18} />
                <p className="mt-2 font-sans text-sm text-muted-foreground">
                  Based on {reviews.count}{" "}
                  {reviews.count === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          </div>
          <RatingsBreakdown items={reviews.items} />
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {visibleReviews.map((review) => (
            <ProductReviewCard key={review.id} review={review} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() =>
                setVisibleCount((current) =>
                  Math.min(current + INITIAL_VISIBLE, reviews.items.length),
                )
              }
              className={cn("min-w-40")}
            >
              Load more
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
