import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr Rag",
  description: "AI-powered medical assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

