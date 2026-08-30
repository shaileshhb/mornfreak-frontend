"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useAuth } from "./auth-provider";

export function SignedInPanel() {
  const { logout } = useAuth();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      await logout();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={handleLogout}
        disabled={pending}
      >
        {pending ? "Logging out…" : "Log out"}
      </Button>
      <Link
        href="/products"
        className="text-center font-sans text-sm font-medium text-primary hover:underline"
      >
        Shop products
      </Link>
    </div>
  );
}
