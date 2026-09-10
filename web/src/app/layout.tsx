import type { Metadata } from "next";
import { DM_Sans, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Laura Piñeros — Mathematician · Data Scientist · Curious mind",
  description:
    "I like finding the simple idea inside complex problems. Portfolio of Laura Piñeros — data, mathematics, curiosity and ideas.",
  openGraph: {
    title: "Laura Piñeros",
    description:
      "Mathematician · Data Scientist · Curious mind. Data × Mathematics × Curiosity × Ideas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${newsreader.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory font-sans text-charcoal">
        {children}
      </body>
    </html>
  );
}
