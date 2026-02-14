import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Susu Manager",
  description: "A platform to control Susu collection in Ghana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
