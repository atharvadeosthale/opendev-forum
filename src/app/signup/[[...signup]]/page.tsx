"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="h-[50rem] w-full flex items-center justify-center">
      <SignUp
        appearance={resolvedTheme === "dark" ? { baseTheme: dark } : undefined}
        signInUrl="/signin"
        path="/signup"
      />
    </div>
  );
}
