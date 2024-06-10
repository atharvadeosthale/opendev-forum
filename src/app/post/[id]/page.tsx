import AnswerCard from "@/components/answer-card";
import QuestionCard from "@/components/question-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/database/drizzle";
import { answers } from "@/database/schema/answers";
import { posts } from "@/database/schema/post";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { userId } = auth();

  const postData = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parseInt(params.id)));

  if (postData.length === 0) {
    return redirect("/");
  }

  const answersData = await db
    .select()
    .from(answers)
    .where(eq(answers.post, parseInt(params.id)));

  async function postAnswer(event: FormData) {
    "use server";

    // Check if user authenticated, deal with not case later as that
    // would be a direct API call, not a priority.
    if (!userId) return;

    if (!event.get("content") || event.get("content") === "") return;

    const newAnswer = await db
      .insert(answers)
      .values({
        content: event.get("content") as string,
        post: parseInt(params.id),
        userId,
      })
      .returning();

    redirect(`/post/${params.id}`);
  }

  return (
    <div>
      <QuestionCard post={postData[0]} />
      <form action={postAnswer} className="flex flex-col mt-5 gap-3">
        <Textarea name="content" placeholder="Answer this question..." />
        <Button type="submit" disabled={!userId}>
          {!userId
            ? "You need to be logged in to submit an answer!"
            : "Submit Answer"}
        </Button>
      </form>
      {answersData.length === 0 ? (
        <div className="text-center mt-5 text-gray-400">No answers yet.</div>
      ) : (
        <h1 className="mt-5 text-xl font-semibold">Answers</h1>
      )}

      <div className="flex mt-5 flex-col gap-5">
        {answersData.map((answer) => (
          <AnswerCard answer={answer} />
        ))}
      </div>
    </div>
  );
}
