import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Share App",
  description: "Share videos on X",
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
