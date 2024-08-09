import type { Metadata } from "next";
import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Dashboard - Chat to PDF",
  description: "Upload files, chat with AI, and more!",
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <div className="flex-1 flex flex-col h-screen">
        <Header />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </ClerkLoaded>
  );
}
export default DashboardLayout;
