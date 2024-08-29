"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import UpgradeButton from "./UpgradeButton";
import ModeToggle from "./ModeToggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

function Header() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-between bg-white shadow-sm p-5 border-b dark:bg-gray-800 gap-5">
      <Link href="/dashboard" className="text-2xl whitespace-nowrap">
        Chat to <span className="text-indigo-600">PDF</span>
      </Link>

      <SignedIn>
        <div className="flex items-center flex-wrap justify-center gap-3">
          <Button asChild variant="link" className="hidden md:flex">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button asChild variant="outline" className="border-indigo-600">
            <Link href="/dashboard/upload">
              <FilePlus2 className="text-indigo-600" />
            </Link>
          </Button>

          <UpgradeButton />
          <ModeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : [],
            }}
            userProfileProps={{
              appearance: {
                baseTheme: theme === "dark" ? dark : [],
              },
            }}
          />
        </div>
      </SignedIn>
    </div>
  );
}
export default Header;
