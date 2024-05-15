import PostCard from "@/components/post-card";
import { db } from "@/database/drizzle";
import { posts } from "@/database/schema/post";

export default async function Home() {
  const allPosts = await db.select().from(posts);

  return (
    <main>
      <div className="my-5 gap-5 flex flex-col">
        {allPosts.map((post) =>
          !post ? null : <PostCard key={post.id} post={post} />
        )}
      </div>
    </main>
  );
}
