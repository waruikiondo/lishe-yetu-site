import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lishe Yetu Initiative | Nourishing Marsabit",
  description: "Improving health outcomes through sustainable food systems in Marsabit County.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, title: "Lishe Yetu", statusBarStyle: "default" },
  icons: {
    icon: "/favicon.png", // This points to public/favicon.png
    apple: "/apple-icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B3C1B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}