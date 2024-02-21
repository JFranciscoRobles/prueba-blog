import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog example",
  description: "Blog example",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="es-MX">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex justify-center p-8">
            <div className="flex flex-col w-full max-w-4xl my-8">
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
