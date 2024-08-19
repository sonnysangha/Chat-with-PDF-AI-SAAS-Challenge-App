"use client";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

function SignUpPage() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <SignUp
        appearance={{
          baseTheme: theme === "dark" ? dark : [],
        }}
      />
    </div>
  );
}

export default SignUpPage;
