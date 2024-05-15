"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="h-[50rem] w-full flex items-center justify-center">
      <SignIn
        appearance={resolvedTheme === "dark" ? { baseTheme: dark } : undefined}
        path="/signin"
        signUpUrl="/signup"
      />
    </div>
  );
}
