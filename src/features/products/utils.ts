import type { Money } from "./types";

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-AE", {
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
