import type { Metadata } from "next";
import { Inter_Tight, Roboto } from "next/font/google";
import "./globals.css";
import HeaderSlate from "@/components/slate/HeaderSlate";
import Footer from "@/components/slate/Footer";
import CustomCursor from "@/components/CustomCursor";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const robotoLight = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto-light",
});

const interTightRegular = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Kedar - Full Stack Developer",
  description:
    "Hey! I'm Kedar, and I work with experienced designers to build digital products that are beautiful, fast, and reliable.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${interTightRegular.variable} relative theme-dark antialiased font-interTight text-slateText hide-scrollbar bg-slateBg`}
      >
        <CustomCursor />
        {/* <Header /> */}
        {/* <HeaderTest /> */}
        <HeaderSlate />
        {children}
        <Footer />
      </body>
    </html>
  );
}
