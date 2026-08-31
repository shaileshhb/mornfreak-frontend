import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { CurrentCustomer, CustomerOrder } from "@/lib/shopify-auth";

const dateFormat = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatMoney(total: CustomerOrder["total"]) {
  if (!total) return null;

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: total.currencyCode,
  }).format(Number(total.amount));
}

/** Shopify returns enums such as UNFULFILLED or PARTIALLY_REFUNDED. */
function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase().replace(/_/g, " ");
}

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground sm:text-2xl">
      {children}
    </h2>
  );
}

function OrderRow({ order }: { order: CustomerOrder }) {
  const total = formatMoney(order.total);
  const statuses = [order.financialStatus, order.fulfillmentStatus].filter(
    (status): status is string => Boolean(status),
  );

  return (
    <li className="border border-foreground/10 bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <a
          href={order.statusPageUrl}
          className="font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {order.name}
        </a>
        {total ? (
          <span className="font-sans text-base font-semibold text-foreground">
            {total}
          </span>
        ) : null}
      </div>

      <p className="mt-1 font-sans text-sm text-muted-foreground">
        {dateFormat.format(new Date(order.processedAt))}
      </p>

      {order.itemTitles.length > 0 ? (
        <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
          {order.itemTitles.join(", ")}
        </p>
      ) : null}

      {statuses.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Badge key={status} variant="outline">
              {formatStatus(status)}
            </Badge>
          ))}
        </div>
      ) : null}
    </li>
  );
}

export function AccountPage({ customer }: { customer: CurrentCustomer }) {
  const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ");

  return (
    <Section>
      <Container className="max-w-3xl">
        <header>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Account
          </p>
          <Heading variant="h1" as="h1" className="mt-4 leading-none">
            {name || "Your account"}
          </Heading>
          <div className="mt-5 space-y-1 font-sans text-sm text-muted-foreground sm:text-base">
            {customer.email ? <p>{customer.email}</p> : null}
            {customer.phone ? <p>{customer.phone}</p> : null}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/products">
              <Button variant="primary" size="lg">
                Shop products
              </Button>
            </Link>
            <a href="/api/auth/logout">
              <Button variant="outline" size="lg">
                Log out
              </Button>
            </a>
          </div>
        </header>

        <div className="mt-14 space-y-12">
          <section>
            <PanelHeading>Default address</PanelHeading>
            {customer.addressLines.length > 0 ? (
              <address className="mt-4 font-sans text-sm not-italic leading-relaxed text-muted-foreground sm:text-base">
                {customer.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            ) : (
              <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                You have not saved an address yet. Add one at checkout on your
                next order.
              </p>
            )}
          </section>

          <section>
            <PanelHeading>Recent orders</PanelHeading>
            {customer.orders.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {customer.orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </ul>
            ) : (
              <div className="mt-4">
                <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                  No orders yet. Your first one shows up here as soon as it is
                  placed.
                </p>
                <Link href="/products" className="mt-5 inline-block">
                  <Button variant="outline" size="md">
                    Browse products
                  </Button>
                </Link>
              </div>
            )}
          </section>
        </div>
      </Container>
    </Section>
  );
}
