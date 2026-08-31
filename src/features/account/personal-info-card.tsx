"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CurrentCustomer } from "@/lib/shopify-auth";

import { updateProfile, type ActionResult } from "./actions";
import { FormError, FormField } from "./form-field";

function displayValue(value: string | null) {
  return value?.trim() || "—";
}

export function PersonalInfoCard({ customer }: { customer: CurrentCustomer }) {
  const [editing, setEditing] = useState(false);
  const [result, action, pending] = useActionState<ActionResult | null, FormData>(
    async (prev, formData) => {
      const next = await updateProfile(prev, formData);
      if (next.ok) setEditing(false);
      return next;
    },
    null,
  );

  const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ");

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {name || "Your profile"}
        </h2>
        {!editing ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full px-4"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        ) : null}
      </div>

      {editing ? (
        <Card className="p-5 sm:p-6">
          <form action={action} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="firstName"
                name="firstName"
                label="First name"
                autoComplete="given-name"
                defaultValue={customer.firstName ?? ""}
              />
              <FormField
                id="lastName"
                name="lastName"
                label="Last name"
                autoComplete="family-name"
                defaultValue={customer.lastName ?? ""}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="profile-email"
                label="Email"
                value={customer.email ?? ""}
                readOnly
                disabled
              />
              <FormField
                id="profile-phone"
                label="Phone number"
                value={customer.phone ?? ""}
                readOnly
                disabled
              />
            </div>
            <p className="font-sans text-sm text-muted-foreground">
              Email and phone come from your Shopify login and cannot be changed
              here.
            </p>
            <FormError message={result && !result.ok ? result.error : null} />
            <div className="flex flex-wrap gap-3">
              <Button type="submit" variant="primary" size="sm" disabled={pending}>
                {pending ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card className="divide-y divide-border overflow-hidden p-0">
          <InfoRow label="Email" value={displayValue(customer.email)} />
          <InfoRow label="Phone number" value={displayValue(customer.phone)} />
        </Card>
      )}
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-5 py-4 sm:px-6">
      <span className="font-sans text-sm text-muted-foreground">{label}</span>
      <span className="text-right font-sans text-sm font-medium text-foreground sm:text-base">
        {value}
      </span>
    </div>
  );
}
