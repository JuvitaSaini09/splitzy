import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Splitzy",
  description: "A simple split bill calculator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/logo-s.png" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <ConvexClientProvider>
          <Header />
          <main className="min-h-screen">
            {children}
            <Toaster />
          </main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
