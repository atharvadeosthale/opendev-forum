import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.POSTGRES_CONNECTION_URI as string);
export const db = drizzle(queryClient);
