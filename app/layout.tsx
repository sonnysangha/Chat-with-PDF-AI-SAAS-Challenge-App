import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ConfigForm from "@/components/ConfigForm";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Home - Chat to PDF",
  description: "Upload files, chat with AI, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen h-screen overflow-hidden flex flex-col bg-white dark:bg-gray-900">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConfigForm />

            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
      <SpeedInsights />
      <Analytics />
    </ClerkProvider>
  );
}
