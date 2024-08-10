import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ConfigForm from "@/components/ConfigForm";

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
        <body className="min-h-screen h-screen overflow-hidden flex flex-col">
          <Toaster />
          {children}
          <ConfigForm />
        </body>
      </html>
    </ClerkProvider>
  );
}
