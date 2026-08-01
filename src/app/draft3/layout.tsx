import type { Metadata } from "next";

import { Draft3Footer } from "@/components/layout/draft3-footer";
import { Draft3Nav } from "@/components/layout/draft3-nav";
import { draft3FontVariables } from "@/design/typography";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: {
    default: "MORNFREAK Draft 3",
    template: "%s | MORNFREAK Draft 3",
  },
};

export default function Draft3Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      data-theme="draft3"
      className={`${draft3FontVariables} flex min-h-full flex-1 flex-col`}
    >
      <Draft3Nav />
      <main className="flex-1">{children}</main>
      <Draft3Footer />
    </div>
  );
}
