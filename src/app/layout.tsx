import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo_Black, Orbitron, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: ["700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NITRO — Full Voltage Energy",
  description:
    "A scroll-driven 3D product experience for NITRO Energy Drink. Zero sugar. Full voltage.",
  openGraph: {
    title: "NITRO — Full Voltage Energy",
    description:
      "A scroll-driven 3D product experience for NITRO Energy Drink. Zero sugar. Full voltage.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${archivoBlack.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-nitro-black text-white"
      >
        {children}
      </body>
    </html>
  );
}
