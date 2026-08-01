import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export function Draft2ClosingCta() {
  return (
    <section className="bg-primary py-20">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:items-center sm:text-center">
          <Heading
            variant="display"
            className="text-primary-foreground"
            as="h2"
          >
            Morning is yours.
          </Heading>
          <Text variant="lead" className="max-w-md text-primary-foreground/85">
            Stop settling for a weak start. Fuel up, show up, and own the day.
          </Text>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/mornfreak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="lg"
                className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
              >
                Follow @mornfreak
              </Button>
            </a>
            <Button
              variant="ghost"
              size="lg"
              disabled
              className="cursor-not-allowed border border-primary-foreground/40 text-primary-foreground opacity-80 hover:bg-transparent"
            >
              Shop — Coming Soon
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
