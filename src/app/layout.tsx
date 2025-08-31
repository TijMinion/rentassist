import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentAssist",
  description: "RentAssit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:bg-raBlueDarker__30_percent" id="html">
    <head>
        <link rel="icon" href="/image/icon/ra-fav.png" />
        <title>RentAssist</title>
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
