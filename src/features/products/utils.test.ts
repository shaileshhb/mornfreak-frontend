import { describe, expect, it } from "vitest";

import { hasVisibleCompareAtPrice } from "./utils";

describe("hasVisibleCompareAtPrice", () => {
  it("shows a compare-at price when it is higher than the active price", () => {
    expect(
      hasVisibleCompareAtPrice(
        { amount: "350.00", currencyCode: "INR" },
        { amount: "400.00", currencyCode: "INR" },
      ),
    ).toBe(true);
  });

  it("hides missing, lower, equal, or mismatched-currency compare-at prices", () => {
    const price = { amount: "350.00", currencyCode: "INR" };

    expect(hasVisibleCompareAtPrice(price, null)).toBe(false);
    expect(
      hasVisibleCompareAtPrice(price, {
        amount: "350.00",
        currencyCode: "INR",
      }),
    ).toBe(false);
    expect(
      hasVisibleCompareAtPrice(price, {
        amount: "300.00",
        currencyCode: "INR",
      }),
    ).toBe(false);
    expect(
      hasVisibleCompareAtPrice(price, {
        amount: "400.00",
        currencyCode: "AED",
      }),
    ).toBe(false);
  });
});
