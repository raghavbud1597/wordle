import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wordle",
  description: "A fun and addictive word-guessing game inspired by the popular Wordle!",
  keywords: "Wordle, word game, puzzle, fun, guessing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
