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

export default async function AnswerCard({ answer }: { answer: Answer }) {
  const { fullName, imageUrl } = await clerkClient.users.getUser(
    answer.userId!
  );

  async function sponsor() {
    "use server";
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
        <form className="flex gap-3 items-center mt-5" action={sponsor}>
          <Input
            type="number"
            className="w-24"
            name="amount"
            placeholder="Amount"
          />
          <Button type="submit" variant="default">
            Sponsor INR
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
