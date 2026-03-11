import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "TerraPulse | Climate Action & Awareness",
  description: "An interactive, brutally honest look at the global climate crisis — its causes, impacts, and solutions. No polish. Just truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-nb-black text-nb-white font-sans antialiased">
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
