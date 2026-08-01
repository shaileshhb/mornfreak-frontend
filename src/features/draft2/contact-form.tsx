"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

type FormState = "idle" | "submitting" | "submitted";

export function Draft2ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setTimeout(() => setState("submitted"), 600);
  }

  if (state === "submitted") {
    return (
      <div className="flex flex-col gap-3 border border-border bg-card p-8 sm:p-10">
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
      className="flex flex-col gap-5 border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="draft2-contact-name"
            className="font-sans text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="draft2-contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-10 border border-input bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="draft2-contact-email"
            className="font-sans text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="draft2-contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            className="h-10 border border-input bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="draft2-contact-subject"
          className="font-sans text-sm font-medium text-foreground"
        >
          Subject
        </label>
        <input
          id="draft2-contact-subject"
          name="subject"
          type="text"
          placeholder="What's this about?"
          className="h-10 border border-input bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="draft2-contact-message"
          className="font-sans text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="draft2-contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what's on your mind..."
          className="resize-none border border-input bg-background px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
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
