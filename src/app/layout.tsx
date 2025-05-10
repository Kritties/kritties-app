import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "./providers";
import BottomBar from "@/components/bottom-bar";
import Topbar from "@/components/top-bar";

import { Handjet } from "next/font/google";

const handjet = Handjet({
  subsets: ["latin"],
  weight: ["400", "700"], // podés elegir los pesos que necesites
  variable: "--font-handjet", // opcional: usar como CSS variable
});

export const metadata: Metadata = {
  title: "Kritties App",
  description: "Kritties App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={handjet.className}>
      <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"/>
      <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"/>
      <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"/>
      <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"/>
      <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"/>
      <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"/>
      <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
      <link rel="manifest" href="/favicon/manifest.json"/>
      <meta name="msapplication-TileColor" content="#FAFAF0"/>
      <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"/>
      <meta name="theme-color" content="#FAFAF0"></meta>
      <body className={`antialiased`}>
        <Web3Provider>
          <Topbar />
          {children}
          <BottomBar />
        </Web3Provider>
      </body>
    </html>
  );
}
