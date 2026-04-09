import { db } from "@/lib";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    // Check if user already exists
    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existing.length > 0) {
      return NextResponse.json(existing[0]);
    }

    // Create new user
    const newUser = await db
      .insert(usersTable)
      .values({
        name: name,
        email: email,
      })
      .returning();

    return NextResponse.json(newUser[0]);
  } catch (error) {
    console.error("users error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
