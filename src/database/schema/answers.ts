import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { posts } from "./post";

export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  content: text("content"),
  userId: text("userId"),
  post: integer("post_id")
    .notNull()
    .references(() => posts.id),
});
