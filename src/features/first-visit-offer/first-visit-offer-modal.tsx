"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

import { isAuthenticated } from "@/lib/auth";
import { cn } from "@/lib/cn";

import { OFFER_IMAGE_ALT, OFFER_IMAGE_SRC, OFFER_SHOW_DELAY_MS } from "./constants";
import { isValidEmail } from "./is-valid-email";
import {
  hasOfferSubscription,
  isOfferDismissedRecently,
  markOfferDismissed,
  markOfferSubscribed,
} from "./storage";

type SubmitResult = {
  discountCode?: string;
};

export function FirstVisitOfferModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) return;
    if (hasOfferSubscription()) return;
    if (isOfferDismissedRecently()) return;

    const timer = window.setTimeout(() => setOpen(true), OFFER_SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return <OfferDialog onDismiss={() => setOpen(false)} />;
}

function OfferDialog({ onDismiss }: { onDismiss: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const errorId = useId();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  function dismiss() {
    markOfferDismissed();
    dialogRef.current?.close();
    onDismiss();
  }

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (!node.open) node.showModal();

    return () => {
      if (node.open) node.close();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; discountCode?: string }
        | null;

      if (!response.ok) {
        setError(payload?.error ?? "Something went wrong. Try again.");
        return;
      }

      markOfferSubscribed();
      setResult({ discountCode: payload?.discountCode });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-[100] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center overflow-y-auto border-0 bg-transparent p-4 backdrop:bg-black/45 backdrop:backdrop-blur-[3px]"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          dismiss();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div
        className="relative grid w-full max-w-[52rem] overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-2"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="order-2 flex flex-col justify-center px-7 py-8 sm:px-10 sm:py-12 lg:order-1 lg:px-12 lg:py-14">
          {result ? (
            <SuccessMessage discountCode={result.discountCode} titleId={titleId} />
          ) : (
            <>
              <p className="font-sans text-[0.7rem] font-semibold uppercase leading-none tracking-[0.22em] text-neutral-400 sm:text-xs">
                Welcome to Mornfreak
              </p>
              <h2
                id={titleId}
                className="font-display mt-4 text-[clamp(1.65rem,4.2vw,2.85rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-neutral-950"
              >
                Get 10% off your first order
              </h2>

              <form className="mt-8 flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
                <label className="sr-only" htmlFor="first-visit-offer-email">
                  Your email
                </label>
                <input
                  id="first-visit-offer-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="YOUR EMAIL"
                  value={email}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError(null);
                  }}
                  className={cn(
                    "h-12 w-full rounded-xl border bg-white px-4 font-sans text-sm tracking-[0.08em] text-foreground placeholder:uppercase placeholder:text-neutral-400",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    error ? "border-destructive" : "border-neutral-300",
                  )}
                />
                {error ? (
                  <p id={errorId} role="alert" className="font-sans text-sm text-destructive">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={pending}
                  className="h-12 w-full rounded-xl bg-primary font-sans text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
                >
                  {pending ? "Sending…" : "Get 10% off now"}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="relative order-1 h-44 sm:h-56 lg:order-2 lg:h-auto lg:min-h-[28rem]">
          <Image
            src={OFFER_IMAGE_SRC}
            alt={OFFER_IMAGE_ALT}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 26rem"
            className="object-cover object-[center_30%]"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={dismiss}
            className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-white/80 text-neutral-800 shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X aria-hidden size={18} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </dialog>
  );
}

function SuccessMessage({
  discountCode,
  titleId,
}: {
  discountCode?: string;
  titleId: string;
}) {
  return (
    <div>
      <p className="font-sans text-[0.7rem] font-semibold uppercase leading-none tracking-[0.22em] text-neutral-400 sm:text-xs">
        Welcome to Mornfreak
      </p>
      <h2
        id={titleId}
        className="font-display mt-4 text-[clamp(1.65rem,4.2vw,2.85rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-neutral-950"
      >
        You&apos;re in
      </h2>
      <p className="mt-5 font-sans text-sm leading-relaxed text-neutral-600 sm:text-base">
        {discountCode
          ? "Use this code on your first order."
          : "Check your inbox for your 10% off code."}
      </p>
      {discountCode ? (
        <p className="mt-4 rounded-xl bg-neutral-100 px-4 py-3 font-sans text-sm font-semibold tracking-[0.16em] text-foreground uppercase">
          {discountCode}
        </p>
      ) : null}
    </div>
  );
}
