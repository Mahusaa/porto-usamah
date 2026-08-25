import type { Metadata } from "next";
import { Hanken_Grotesk, Sacramento, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MobileNav from "./components/mobile-nav";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

// the wordmark only: tulisan latin bersambung — one unbroken monoline stroke
const sacramento = Sacramento({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Usamah Hafizh Ammar Zaim",
  description:
    "Head of Engineering at Pietra Digital Technology. The AI platform I lead explains an issue itself: what is being claimed, who is driving it, and where it heads next.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${spaceGrotesk.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
