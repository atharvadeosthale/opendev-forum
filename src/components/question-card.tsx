import { Post } from "@/types/posts";
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

export default async function QuestionCard({ post }: { post: Post }) {
  const { fullName, imageUrl } = await clerkClient.users.getUser(post.userId!);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <img
            src={imageUrl}
            alt={fullName || "Profile Picture"}
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm">{fullName}</p>
        </div>
        <p className="text-lg mt-5 line-clamp-2">{post.content}</p>
      </CardContent>
    </Card>
  );
}
