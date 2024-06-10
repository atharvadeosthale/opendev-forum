import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerkUserId").notNull(),
  stripeAccountId: text("stripeAccountId"),
});
