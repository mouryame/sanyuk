import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SanYuk",
  description: "SanYuk - A Knowledge Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${quicksand.variable} antialiased`}>
        <div className="fixed bg-black top-0 w-full max-w-600 m-auto p-4 z-10">
          <Navbar />
        </div>
        <div className="mt-20">{children}</div>
        <div className="bottom-0 h-30 w-full max-w-600 m-auto p-4">
          <Footer />
        </div>
      </body>
    </html>
  );
}
