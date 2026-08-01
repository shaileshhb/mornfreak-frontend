import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";

export default function LiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
