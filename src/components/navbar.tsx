import { auth, currentUser } from "@clerk/nextjs/server";
import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Navbar() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div className="py-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link href="/">OpenDev</Link>
      </div>
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link href="/signin">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary">Create a new account</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/create">
              <Button variant="secondary">Create Post</Button>
            </Link>
            <img
              className="h-10 w-10 rounded-full"
              src={user.imageUrl}
              alt={user.fullName || "Profile picture"}
            />
          </>
        )}
        <ThemeToggler />
      </div>
    </div>
  );
}
