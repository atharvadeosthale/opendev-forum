"use client";

import { useAuth } from "@clerk/nextjs";

export default function LogoutButton({
  imageUrl,
  fullName,
}: {
  imageUrl: string;
  fullName: string;
}) {
  const { signOut } = useAuth();

  return (
    <div>
      <img
        className="h-10 w-10 rounded-full cursor-pointer"
        onClick={async () => {
          await signOut();
          window.location.reload();
        }}
        src={imageUrl}
        alt={fullName || "Profile picture"}
      />
    </div>
  );
}
