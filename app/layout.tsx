import type { Metadata } from "next";
import { Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LiveCursors from "./components/live-cursors";
import { PresenceProvider } from "./components/presence-context";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Usamah Hafizh Ammar Zaim",
  description:
    "Head of Engineering at Pietra Digital Technology. I build AI that reads a public issue the way an analyst would — the narratives behind the noise, not just mention counts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PresenceProvider>
          {children}
          <LiveCursors />
        </PresenceProvider>
      </body>
    </html>
  );
}
