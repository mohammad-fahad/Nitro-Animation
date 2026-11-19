import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NITRO — Full Voltage Energy",
  description:
    "A scroll-driven 3D product experience for NITRO Energy Drink. Zero sugar. Full voltage.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-nitro-black text-white">{children}</body>
    </html>
  );
}
