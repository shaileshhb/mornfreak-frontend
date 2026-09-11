import { describe, expect, it } from "vitest";

import type { CommerceVariant } from "../types";
import {
  getVariantAvailability,
  selectDefaultVariant,
  selectListingVariant,
} from "./product-mappers";

function variant(
  overrides: Partial<CommerceVariant> = {},
): CommerceVariant {
  return {
    id: "gid://shopify/ProductVariant/1",
    title: "Default Title",
    sku: null,
    availableForSale: true,
    currentlyNotInStock: false,
    quantityAvailable: 5,
    price: { amount: "30.00", currencyCode: "AED" },
    compareAtPrice: null,
    selectedOptions: [],
    ...overrides,
  };
}

describe("getVariantAvailability", () => {
  it("treats tracked zero inventory as sold out", () => {
    expect(
      getVariantAvailability(
        variant({
          quantityAvailable: 0,
          availableForSale: true,
          currentlyNotInStock: true,
        }),
      ),
    ).toBe("sold_out");
  });

  it("uses Shopify availability when the exact quantity is unavailable", () => {
    expect(
      getVariantAvailability(
        variant({ quantityAvailable: null, availableForSale: false }),
      ),
    ).toBe("sold_out");
  });

  it("preserves an explicit backorder when quantity is not reported", () => {
    expect(
      getVariantAvailability(
        variant({ quantityAvailable: null, currentlyNotInStock: true }),
      ),
    ).toBe("backorder");
  });

  it("marks a sellable positive quantity as available", () => {
    expect(getVariantAvailability(variant())).toBe("available");
  });
});

describe("selectDefaultVariant", () => {
  it("prefers an in-stock variant over sold-out and backorder variants", () => {
    const soldOut = variant({ id: "sold-out", quantityAvailable: 0 });
    const backorder = variant({
      id: "backorder",
      quantityAvailable: null,
      currentlyNotInStock: true,
    });
    const available = variant({ id: "available", quantityAvailable: 3 });

    expect(selectDefaultVariant([soldOut, backorder, available])?.id).toBe(
      "available",
    );
  });

  it("returns the first variant when every variant is sold out", () => {
    const first = variant({ id: "first", quantityAvailable: 0 });
    const second = variant({
      id: "second",
      quantityAvailable: 0,
      availableForSale: false,
    });

    expect(selectDefaultVariant([first, second])?.id).toBe("first");
  });

  it("returns null for a product without variants", () => {
    expect(selectDefaultVariant([])).toBeNull();
  });
});

describe("selectListingVariant", () => {
  it("uses the lowest-priced sellable variant for a From price", () => {
    const expensive = variant({
      id: "expensive",
      price: { amount: "50.00", currencyCode: "AED" },
    });
    const cheapest = variant({
      id: "cheapest",
      price: { amount: "30.00", currencyCode: "AED" },
    });

    expect(selectListingVariant([expensive, cheapest])?.id).toBe("cheapest");
  });

  it("does not advertise a sold-out variant's lower price", () => {
    const soldOut = variant({
      id: "sold-out",
      quantityAvailable: 0,
      price: { amount: "10.00", currencyCode: "AED" },
    });
    const available = variant({
      id: "available",
      price: { amount: "30.00", currencyCode: "AED" },
    });

    expect(selectListingVariant([soldOut, available])?.id).toBe("available");
  });
});
