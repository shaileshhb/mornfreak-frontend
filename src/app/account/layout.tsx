import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AccountShell } from "@/features/account";
import { requireAccountAccess } from "@/lib/shopify-auth";

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
