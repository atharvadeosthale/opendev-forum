import { auth, currentUser } from "@clerk/nextjs/server";
import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";
import Link from "next/link";
import LogoutButton from "./logout-button";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema/users";
import { eq } from "drizzle-orm";
import { stripe } from "@/stripe/stripe";

export default async function Navbar() {
  const { userId } = auth();
  const user = await currentUser();
  let needsSetup = false;
  let stripeSetupLink = "";

  if (userId) {
    const dbUserRecords = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId));

    if (dbUserRecords.length === 0) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "US",
        default_currency: "USD",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      await db
        .insert(users)
        .values({ clerkUserId: userId, stripeAccountId: account.id })
        .returning();
      const setupLink = await stripe.accountLinks.create({
        account: account.id,
        type: "account_onboarding",
        return_url: "http://localhost:3000",
        refresh_url: "http://localhost:3000",
      });
      needsSetup = true;
      stripeSetupLink = setupLink.url;
    } else {
      const account = await stripe.accounts.retrieve(
        dbUserRecords[0].stripeAccountId!
      );

      if (!account.payouts_enabled) {
        const setupLink = await stripe.accountLinks.create({
          account: account.id,
          type: "account_onboarding",
          return_url: "http://localhost:3000",
          refresh_url: "http://localhost:3000",
        });

        needsSetup = true;
        stripeSetupLink = setupLink.url;
      }
    }
  }

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
            {needsSetup && (
              <a href={stripeSetupLink}>
                <Button variant="link">Setup payments</Button>
              </a>
            )}
            <Link href="/create">
              <Button variant="secondary">Create Post</Button>
            </Link>
            <LogoutButton
              imageUrl={user.imageUrl}
              fullName={user.fullName || "Profile picture"}
            />
          </>
        )}
        <ThemeToggler />
      </div>
    </div>
  );
}
