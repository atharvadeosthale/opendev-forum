import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/database/drizzle";
import { posts } from "@/database/schema/post";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function CreatePage() {
  const { userId } = auth();

  async function createPost(event: FormData) {
    "use server";

    const title = event.get("title");
    const content = event.get("content");

    // Create a new post
    const newPost = await db
      .insert(posts)
      .values({
        title: title as string,
        content: content as string,
        userId,
      })
      .returning();

    // Redirect to the post page
    redirect("/post/" + newPost[0].id);
  }

  return (
    <form
      method="post"
      action={createPost}
      className="mt-5 flex flex-col gap-5"
    >
      <Input className="" type="text" name="title" placeholder="Title" />
      <Textarea
        name="content"
        placeholder="Describe your issue in detail..."
        className="h-40"
      />
      <Button type="submit">Create Post</Button>
    </form>
  );
}
