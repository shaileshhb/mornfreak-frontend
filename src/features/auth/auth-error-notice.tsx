import { Container } from "@/components/ui/container";

const MESSAGES: Record<string, string> = {
  config: "Account login is not configured yet.",
  csrf: "That sign-in attempt expired. Start again from the account icon.",
  missing: "Shopify did not return a valid authorization code. Try again.",
  token: "We could not complete sign-in. Try again.",
};

export function AuthErrorNotice({ code }: { code?: string }) {
  const message = code ? MESSAGES[code] : undefined;

  if (!message) return null;

  return (
    <div className="border-b border-destructive/30 bg-destructive/10 py-3">
      <Container>
        <p
          className="font-sans text-sm font-medium text-destructive"
          role="alert"
        >
          {message}
        </p>
      </Container>
    </div>
  );
}
