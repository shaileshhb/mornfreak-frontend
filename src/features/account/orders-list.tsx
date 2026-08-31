import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CustomerOrder, CurrentCustomer } from "@/lib/shopify-auth";

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

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase().replace(/_/g, " ");
}

function OrderRow({ order }: { order: CustomerOrder }) {
  const total = formatMoney(order.total);
  const statuses = [order.financialStatus, order.fulfillmentStatus].filter(
    (status): status is string => Boolean(status),
  );

  return (
    <li>
      <Card className="p-5 sm:p-6">
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
      </Card>
    </li>
  );
}

export function OrdersList({ customer }: { customer: CurrentCustomer }) {
  return (
    <section>
      <h1 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        Orders
      </h1>
      {customer.orders.length > 0 ? (
        <ul className="mt-5 space-y-4">
          {customer.orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </ul>
      ) : (
        <div className="mt-5">
          <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            No orders yet. Your first one shows up here as soon as it is placed.
          </p>
          <Link href="/products" className="mt-5 inline-block">
            <Button variant="outline" size="md" className="rounded-full px-5">
              Browse products
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
