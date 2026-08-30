import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/cn";

type AuthCardProps = {
  kicker: string;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "narrow" | "wide";
  titleClassName?: string;
};

export function AuthCard({
  kicker,
  title,
  description,
  children,
  footer,
  width = "narrow",
  titleClassName,
}: AuthCardProps) {
  return (
    <section className="bg-background py-16 sm:py-24">
      <Container className={cn(width === "wide" ? "max-w-2xl" : "max-w-md")}>
        <div className="border border-foreground/10 bg-card px-6 py-10 sm:px-10 sm:py-12">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {kicker}
          </p>
          <Heading
            variant="h1"
            as="h1"
            className={cn("mt-3 leading-none", titleClassName)}
          >
            {title}
          </Heading>
          {description ? (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          <div className="mt-8">{children}</div>
          {footer ? (
            <div className="mt-8 border-t border-foreground/10 pt-6 font-sans text-sm text-muted-foreground">
              {footer}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
