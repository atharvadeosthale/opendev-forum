import { Answer, Post } from "@/types/posts";
import { clerkClient } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema/users";
import { eq } from "drizzle-orm";
import { stripe } from "@/stripe/stripe";
import { redirect } from "next/navigation";

export default async function AnswerCard({ answer }: { answer: Answer }) {
  const { fullName, imageUrl } = await clerkClient.users.getUser(
    answer.userId!
  );

  let paymentsSetUp = false;

  const userDbData = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, answer.userId!));

  const account = await stripe.accounts.retrieve(
    userDbData[0].stripeAccountId!
  );

  if (account.payouts_enabled) paymentsSetUp = true;

  async function sponsor(formData: FormData) {
    "use server";

    if (!paymentsSetUp) return;

    const session = await stripe.checkout.sessions.create(
      {
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Donation",
              },
              unit_amount: parseInt(formData.get("amount") as string) * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000",
      },
      {
        stripeAccount: account.id,
      }
    );

    redirect(session.url || "/");
  }

  return (
    <Card>
      <CardContent className="mt-5">
        <div className="flex items-center gap-3">
          <img
            src={imageUrl}
            alt={fullName || "Profile Picture"}
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm">{fullName}</p>
        </div>
        <p className="text-lg mt-5 line-clamp-2">{answer.content}</p>
        {!paymentsSetUp ? (
          <p className="text-sm text-gray-400 mt-5">
            User has not set up payments.
          </p>
        ) : (
          <form className="flex gap-3 items-center mt-5" action={sponsor}>
            <Input
              type="number"
              className="w-24"
              name="amount"
              placeholder="Amount"
            />
            <Button type="submit" variant="default">
              Sponsor
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
