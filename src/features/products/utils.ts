import type { Money } from "./types";

const CURRENCY_LOCALES: Record<string, string> = {
  AED: "en-AE",
  INR: "en-IN",
};

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat(CURRENCY_LOCALES[money.currencyCode] ?? "en", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}

export function formatReviewDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
