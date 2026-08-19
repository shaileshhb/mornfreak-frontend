import type { Metadata } from "next";

import { LegalDocumentPage, PRIVACY_DOCUMENT } from "@/features/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mornfreak collects, uses, and protects personal information when you shop or interact with us.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function Page() {
  return <LegalDocumentPage document={PRIVACY_DOCUMENT} />;
}
