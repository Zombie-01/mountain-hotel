import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

export const metadata: Metadata = {
  title: "Mountain Hotel Mongolia | Luxury Dining & Lounge",
  description: "Experience authentic Mongolian hospitality at Mountain Hotel. Fine dining restaurant, premium lounge, and world-class service in the heart of Khovd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className="antialiased">
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
