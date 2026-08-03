import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";

export default function LiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
