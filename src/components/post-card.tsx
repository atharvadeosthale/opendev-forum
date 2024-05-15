import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Post } from "@/types/posts";

export default async function PostCard({ post }: { post: Post }) {
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
      <CardFooter>
        <Link href={`/post/${post.id}`}>
          <Button variant="default">Open Thread</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
