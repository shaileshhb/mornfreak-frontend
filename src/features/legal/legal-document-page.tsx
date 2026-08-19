import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

import type { LegalContact, LegalDocument } from "./types";

function renderRichText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function ContactBlock({ contact }: { contact: LegalContact }) {
  return (
    <section>
      {contact.heading ? (
        <h2 className="font-display text-xl uppercase tracking-wide text-foreground sm:text-2xl">
          {contact.heading}
        </h2>
      ) : null}
      {contact.lead ? (
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
          {contact.lead}
        </p>
      ) : null}
      <div className={contact.heading || contact.lead ? "mt-4 space-y-2" : "space-y-2"}>
        {contact.name ? (
          <p className="font-sans text-sm font-semibold text-foreground sm:text-base">
            {contact.name}
          </p>
        ) : null}
        <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
          Email:{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-foreground transition-colors hover:text-primary"
          >
            {contact.email}
          </a>
        </p>
        <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
          Website:{" "}
          <a
            href={contact.website}
            className="text-foreground transition-colors hover:text-primary"
          >
            {contact.websiteLabel}
          </a>
        </p>
      </div>
      {contact.tagline ? (
        <p className="mt-6 font-sans text-sm font-semibold text-foreground sm:text-base">
          {contact.tagline}
        </p>
      ) : null}
    </section>
  );
}

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <Section>
      <Container className="max-w-3xl">
        <header className="mx-auto max-w-2xl text-center">
          <Heading variant="h1" as="h1">
            {document.title}
          </Heading>
          <p className="mt-4 font-sans text-base text-muted-foreground sm:text-lg">
            {renderRichText(document.intro)}
          </p>
        </header>

        <div className="mt-12 space-y-10 md:mt-16">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl uppercase tracking-wide text-foreground sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {renderRichText(paragraph)}
                  </p>
                ))}
                {section.items ? (
                  <ul className="list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {section.items.map((item) => (
                      <li key={item}>{renderRichText(item)}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}

          <ContactBlock contact={document.contact} />
        </div>
      </Container>
    </Section>
  );
}
