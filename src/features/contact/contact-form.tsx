"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

type FormState = "idle" | "submitting" | "submitted";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    // Simulate async (no backend wiring)
    setTimeout(() => setState("submitted"), 600);
  }

  if (state === "submitted") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center">
        <span className="text-4xl" role="img" aria-label="Checkmark">
          ✅
        </span>
        <Heading variant="h3">Message received.</Heading>
        <Text variant="muted">
          We&apos;ll get back to you as soon as we can. Usually within 24 hours.
        </Text>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="font-sans text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-10 rounded-md border border-input bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="font-sans text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            className="h-10 rounded-md border border-input bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-subject"
          className="font-sans text-sm font-medium text-foreground"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="What's this about?"
          className="h-10 rounded-md border border-input bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="font-sans text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what's on your mind..."
          className="rounded-md border border-input bg-background px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className={cn("w-full sm:w-auto sm:self-start", state === "submitting" && "opacity-70")}
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
