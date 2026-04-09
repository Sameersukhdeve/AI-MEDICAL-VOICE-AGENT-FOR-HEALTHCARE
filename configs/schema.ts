import { integer, pgTable, varchar, text, jsonb, serial } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  credits: integer("credits"),
});

export const SessionChatTable = pgTable("sessionChatTable", {
  id: serial("id").primaryKey(),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  notes: text("notes"),
  conversation: jsonb("conversation"),
  report: jsonb("report"),
  createdBy: varchar("createdBy", { length: 255 }),
  createdOn: varchar("createdOn", { length: 255 }),
  selectedDoctor: jsonb("selectedDoctor"),
  user: varchar("user", { length: 255 }),
});