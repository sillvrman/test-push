import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../firebase.js";
import ToasterComponent from "./ToastComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterComponent />
        {children}
      </body>
    </html>
  );
}
