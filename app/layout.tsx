import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {neobrutalism} from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider"


const font = Poppins({ 
  subsets: ["latin"],
  weight:["500"]
 });

export const metadata: Metadata = {
  title: "Budget Buddy",
  description: "Expense Manager at your Fingertips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: neobrutalism,
      elements:{
        card:"rounded-2xl"
      }
    }}
    >
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
      {/* <ThemeProvider
            attribute="class"
            defaultTheme="light"
          > */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
