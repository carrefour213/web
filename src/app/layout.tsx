import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Footer from "@/components/footer";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";


const rubik = Rubik({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Carrefour",
  description: "Boutique de vêtements en ligne",
};

const Breadcrumb = dynamic(() => import('@/components/breadcrumb'), {
  ssr: false
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={rubik.className + ` mt-[74px]`}>
        <SessionProvider>

          {session?.user.role === UserRole.ADMIN ?
            <EdgeStoreProvider>
              <Navbar />
              {children}
            </EdgeStoreProvider>
            :
            <CartProvider>
              <Navbar />
              <Breadcrumb />
              {children}
              <Footer />
            </CartProvider>
          }
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
