import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wordle",
  description:
    "A fun and addictive word-guessing game inspired by the popular Wordle! ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
