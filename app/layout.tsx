import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./(root)/Components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "./(root)/Components/Sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ahmed Sultan's Portfolio",
  description: "I am a Web Developer and This My Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body className="h-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="h-[60px] inset-y-0 fixed z-50 w-full">
              <Navbar />
            </div>
            <div className="hidden md:block pt-[70px] w-56 h-full inset-y-0 fixed z-50">
              <Sidebar />
            </div>
            <main className="md:pl-56 pt-[60px] h-full z-0 my-7">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
