import type { ReactNode } from "react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AccountShell } from "@/features/account";
import { requireAccountAccess } from "@/lib/shopify-auth";
import { PRIVATE_ROUTE_METADATA } from "@/lib/seo";

export const metadata: Metadata = PRIVATE_ROUTE_METADATA;

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAccountAccess("/account");

  return (
    <Section className="py-10 sm:py-12 lg:py-16">
      <Container>
        <AccountShell>{children}</AccountShell>
      </Container>
    </Section>
  );
}
