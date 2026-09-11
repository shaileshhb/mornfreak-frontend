"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Cart } from "@/features/products/types";

type CartContextValue = {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addLine: (merchandiseId: string, quantity?: number) => Promise<Cart | null>;
  updateLine: (lineId: string, quantity: number) => Promise<Cart | null>;
  removeLine: (lineId: string) => Promise<Cart | null>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<string>;
  refreshCart: () => Promise<Cart | null>;
};

type CartResponse = {
  cart?: Cart | null;
  error?: string;
};

type CheckoutResponse = {
  checkoutUrl?: string;
  error?: string;
};

const CartContext = createContext<CartContextValue | null>(null);

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => ({}))) as T & {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(payload.error || "Cart request failed");
  }

  return payload;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestCart = useCallback(
    async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Cart | null> => {
      setError(null);
      const response = await fetch(input, {
        credentials: "same-origin",
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init?.headers,
        },
      });
      const payload = await parseJsonResponse<CartResponse>(response);
      setCart(payload.cart ?? null);
      return payload.cart ?? null;
    },
    [],
  );

  const refreshCart = useCallback(async () => {
    try {
      return await requestCart("/api/cart");
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Cart request failed";
      setError(message);
      setCart(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestCart]);

  useEffect(() => {
    queueMicrotask(() => {
      void refreshCart();
    });
  }, [refreshCart]);

  const addLine = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      return requestCart("/api/cart/lines", {
        method: "POST",
        body: JSON.stringify({ merchandiseId, quantity }),
      });
    },
    [requestCart],
  );

  const updateLine = useCallback(
    async (lineId: string, quantity: number) => {
      return requestCart("/api/cart/lines", {
        method: "PATCH",
        body: JSON.stringify({ lineId, quantity }),
      });
    },
    [requestCart],
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      return requestCart("/api/cart/lines", {
        method: "DELETE",
        body: JSON.stringify({ lineId }),
      });
    },
    [requestCart],
  );

  const clearCart = useCallback(async () => {
    await requestCart("/api/cart", { method: "DELETE" });
  }, [requestCart]);

  const checkout = useCallback(async () => {
    setError(null);
    const response = await fetch("/api/cart/checkout", {
      method: "POST",
      credentials: "same-origin",
    });
    const payload = await parseJsonResponse<CheckoutResponse>(response);

    if (!payload.checkoutUrl) {
      throw new Error("Checkout is unavailable");
    }

    return payload.checkoutUrl;
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      error,
      addLine,
      updateLine,
      removeLine,
      clearCart,
      checkout,
      refreshCart,
    }),
    [
      cart,
      loading,
      error,
      addLine,
      updateLine,
      removeLine,
      clearCart,
      checkout,
      refreshCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
