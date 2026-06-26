import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeShift — Advanced LLM Style Transformation",
  description: "Transform any text into any style with few-shot prompting, quality scoring, and style classification.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}