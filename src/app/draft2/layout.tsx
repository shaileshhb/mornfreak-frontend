import type { Metadata } from "next";

import { Draft2Footer } from "@/components/layout/draft2-footer";
import { Draft2Nav } from "@/components/layout/draft2-nav";
import { draft2FontVariables } from "@/design/typography";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: {
    default: "MORNFREAK Draft 2",
    template: "%s | MORNFREAK Draft 2",
  },
};

export default function Draft2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      data-theme="draft2"
      className={`${draft2FontVariables} flex min-h-full flex-1 flex-col`}
    >
      <Draft2Nav />
      <main className="flex-1">{children}</main>
      <Draft2Footer />
    </div>
  );
}
