"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

function SignInPage() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <SignIn
        appearance={{
          baseTheme: theme === "dark" ? dark : [],
        }}
      />
    </div>
  );
}

export default SignInPage;
