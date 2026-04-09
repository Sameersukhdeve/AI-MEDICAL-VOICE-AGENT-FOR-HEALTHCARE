import { NextResponse } from "next/server";
import { db } from "@/lib";
import { SessionChatTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "No sessionId provided" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.sessionId, sessionId));

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("GET session-chat error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { notes, selectedDoctor } = await req.json();

    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress ?? "";

    const sessionId = uuidv4();

    await db.insert(SessionChatTable).values({
      sessionId: sessionId,
      notes: notes,
      selectedDoctor: selectedDoctor,
      createdBy: email,
      createdOn: new Date().toLocaleString(),
      conversation: null,
      report: null,
      user: "user",
    });

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("POST session-chat error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}