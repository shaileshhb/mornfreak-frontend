"use client";

import { ChevronRight, MapPin } from "lucide-react";
import { useActionState, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CustomerAddress } from "@/lib/shopify-auth";

import { deleteAddress, saveAddress, type ActionResult } from "./actions";
import { FormError, FormField } from "./form-field";

type Panel = { mode: "create" } | { mode: "edit"; address: CustomerAddress } | null;

export function AddressesList({ addresses }: { addresses: CustomerAddress[] }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [result, action, pending] = useActionState<ActionResult | null, FormData>(
    async (prev, formData) => {
      const next = await saveAddress(prev, formData);
      if (next.ok) setPanel(null);
      return next;
    },
    null,
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const editing = panel?.mode === "edit" ? panel.address : null;

  async function handleDelete(addressId: string) {
    setDeleting(true);
    setDeleteError(null);
    const outcome = await deleteAddress(addressId);
    setDeleting(false);
    if (!outcome.ok) {
      setDeleteError(outcome.error);
      return;
    }
    setPanel(null);
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Addresses
        </h2>
        {panel ? null : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full px-4"
            onClick={() => setPanel({ mode: "create" })}
          >
            Add
          </Button>
        )}
      </div>

      {panel ? (
        <Card className="p-5 sm:p-6">
          <form action={action} className="space-y-4">
            {editing ? (
              <input type="hidden" name="addressId" value={editing.id} />
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="address-firstName"
                name="firstName"
                label="First name"
                autoComplete="given-name"
                defaultValue={editing?.firstName ?? ""}
              />
              <FormField
                id="address-lastName"
                name="lastName"
                label="Last name"
                autoComplete="family-name"
                defaultValue={editing?.lastName ?? ""}
              />
              <FormField
                id="address-company"
                name="company"
                label="Company"
                autoComplete="organization"
                defaultValue={editing?.company ?? ""}
                className="sm:col-span-2"
              />
              <FormField
                id="address-address1"
                name="address1"
                label="Address"
                autoComplete="address-line1"
                required
                defaultValue={editing?.address1 ?? ""}
                className="sm:col-span-2"
              />
              <FormField
                id="address-address2"
                name="address2"
                label="Apartment, suite, etc."
                autoComplete="address-line2"
                defaultValue={editing?.address2 ?? ""}
                className="sm:col-span-2"
              />
              <FormField
                id="address-city"
                name="city"
                label="City"
                autoComplete="address-level2"
                required
                defaultValue={editing?.city ?? ""}
              />
              <FormField
                id="address-zoneCode"
                name="zoneCode"
                label="State / region"
                autoComplete="address-level1"
                defaultValue={editing?.zoneCode ?? ""}
              />
              <FormField
                id="address-zip"
                name="zip"
                label="Postal code"
                autoComplete="postal-code"
                defaultValue={editing?.zip ?? ""}
              />
              <FormField
                id="address-territoryCode"
                name="territoryCode"
                label="Country code"
                autoComplete="country"
                required
                maxLength={2}
                placeholder="AE"
                defaultValue={editing?.territoryCode ?? ""}
              />
              <FormField
                id="address-phoneNumber"
                name="phoneNumber"
                label="Phone"
                type="tel"
                autoComplete="tel"
                defaultValue={editing?.phoneNumber ?? ""}
                className="sm:col-span-2"
              />
            </div>
            <label className="flex items-center gap-2 font-sans text-sm text-foreground">
              <input
                type="checkbox"
                name="defaultAddress"
                defaultChecked={editing?.isDefault ?? addresses.length === 0}
                className="size-4 rounded border-input"
              />
              Set as default address
            </label>
            <FormError
              message={
                deleteError ?? (result && !result.ok ? result.error : null)
              }
            />
            <div className="flex flex-wrap gap-3">
              <Button type="submit" variant="primary" size="sm" disabled={pending}>
                {pending ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setPanel(null);
                  setDeleteError(null);
                }}
              >
                Cancel
              </Button>
              {editing ? (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={deleting}
                  onClick={() => void handleDelete(editing.id)}
                >
                  {deleting ? "Deleting…" : "Delete"}
                </Button>
              ) : null}
            </div>
          </form>
        </Card>
      ) : addresses.length === 0 ? (
        <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
          You have not saved an address yet. Add one here or at checkout on your
          next order.
        </p>
      ) : (
        <Card className="divide-y divide-border overflow-hidden p-0">
          {addresses.map((address) => (
            <button
              key={address.id}
              type="button"
              className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-accent/40 sm:px-5"
              onClick={() => setPanel({ mode: "edit", address })}
            >
              <MapPin
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-sans text-sm font-semibold text-foreground sm:text-base">
                    {[address.firstName, address.lastName].filter(Boolean).join(" ") ||
                      "Address"}
                  </span>
                  {address.isDefault ? (
                    <Badge variant="secondary" className="rounded-full font-medium">
                      Default
                    </Badge>
                  ) : null}
                </span>
                <span className="mt-1 block font-sans text-sm leading-relaxed text-muted-foreground">
                  {address.formatted.join(", ")}
                </span>
              </span>
              <ChevronRight
                aria-hidden
                className="size-5 shrink-0 text-muted-foreground"
              />
            </button>
          ))}
        </Card>
      )}
    </section>
  );
}
