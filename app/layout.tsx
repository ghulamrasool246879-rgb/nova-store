
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import { CartProvider } from "@/components/store/CartContext";

export const metadata: Metadata = {
  title: "NOVA Store | Modern Living",
  description:
    "Discover thoughtfully designed products for your home, lifestyle, and everyday living at NOVA Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}