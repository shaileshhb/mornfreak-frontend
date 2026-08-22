import {
  OFFER_DISMISS_COOLDOWN_MS,
  STORAGE_DISMISSED_AT,
  STORAGE_SUBSCRIBED,
} from "./constants";

function readItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: skip persistence.
  }
}

export function hasOfferSubscription(): boolean {
  return readItem(STORAGE_SUBSCRIBED) === "true";
}

export function isOfferDismissedRecently(): boolean {
  const raw = readItem(STORAGE_DISMISSED_AT);
  if (!raw) return false;

  const dismissedAt = Number(raw);
  if (!Number.isFinite(dismissedAt)) return false;

  return Date.now() - dismissedAt < OFFER_DISMISS_COOLDOWN_MS;
}

export function markOfferDismissed(): void {
  writeItem(STORAGE_DISMISSED_AT, String(Date.now()));
}

export function markOfferSubscribed(): void {
  writeItem(STORAGE_SUBSCRIBED, "true");
}
