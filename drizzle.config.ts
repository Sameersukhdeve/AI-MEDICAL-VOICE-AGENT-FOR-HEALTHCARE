import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.ts",   // adjust path if your schema is elsewhere
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // must be your NEON connection string
  },
});