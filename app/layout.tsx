import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forms",
  description: "Form handling : A guide for form-handling in Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("w-full min-h-screen")}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="text-gray-400">
            <Navbar />
            <main>{children}</main>
            <Toaster position={"top-right"} richColors={true} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
