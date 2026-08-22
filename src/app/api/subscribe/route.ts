import { NextResponse } from "next/server";

import { isValidEmail } from "@/features/first-visit-offer/is-valid-email";

type SubscribeBody = {
  email?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SubscribeBody | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  // TODO: wire to real email-capture endpoint
  return NextResponse.json(
    {
      error:
        "Email capture isn't connected yet. Your address was not saved.",
    },
    { status: 501 },
  );
}
