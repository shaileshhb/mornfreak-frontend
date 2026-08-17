import { Container } from "@/components/ui/container";

export function ProductDetailSkeleton() {
  return (
    <section className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <div className="hidden grid-cols-2 gap-3 lg:grid">
              <div className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />
              <div className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />
              <div className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />
              <div className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />
            </div>
            <div className="aspect-[4/3] animate-pulse rounded-2xl bg-muted lg:hidden" />
          </div>
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="h-3 w-40 animate-pulse rounded bg-muted" />
            <div className="h-10 w-80 max-w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-48 max-w-full animate-pulse rounded bg-muted" />
            <div className="flex gap-2">
              <div className="h-16 w-24 animate-pulse rounded-xl bg-muted" />
              <div className="h-16 w-24 animate-pulse rounded-xl bg-muted" />
              <div className="h-16 w-24 animate-pulse rounded-xl bg-muted" />
            </div>
            <div className="h-8 w-32 animate-pulse rounded bg-muted" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
            <div className="flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-md bg-muted" />
              <div className="h-6 w-20 animate-pulse rounded-md bg-muted" />
              <div className="h-6 w-24 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
