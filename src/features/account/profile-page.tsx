import { Button } from "@/components/ui/button";
import type { CurrentCustomer } from "@/lib/shopify-auth";

import { AddressesList } from "./addresses-list";
import { MarketingPreferences } from "./marketing-preferences";
import { PersonalInfoCard } from "./personal-info-card";

export function ProfilePage({ customer }: { customer: CurrentCustomer }) {
  return (
    <div className="space-y-10">
      <PersonalInfoCard customer={customer} />
      <AddressesList addresses={customer.addresses} />
      <MarketingPreferences marketingState={customer.emailMarketingState} />
      <a href="/api/auth/logout" className="inline-block">
        <Button variant="outline" size="md" className="rounded-full px-6">
          Sign out
        </Button>
      </a>
    </div>
  );
}
