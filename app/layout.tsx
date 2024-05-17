import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {neobrutalism} from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/providers/query-provider";
import { NewAccountSheetProvider } from "@/providers/new-account-provider";
import {Toaster} from "sonner";


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
          {/* Adding providers mean that I can access it globally anywhere */}
          <QueryProvider>
            <NewAccountSheetProvider/>
            <Toaster richColors />
        {children}
         </QueryProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
