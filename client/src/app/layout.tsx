import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/Providers";
import Header from "@/components/Header";
import { Footer } from "@/components/ui";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalentBridge Gaza",
  description: "Connecting talented individuals with opportunities in Gaza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
