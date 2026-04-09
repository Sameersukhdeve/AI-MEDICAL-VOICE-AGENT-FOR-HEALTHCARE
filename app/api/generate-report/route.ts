import { NextResponse } from "next/server";
import { db } from "@/lib";
import { SessionChatTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received body:", JSON.stringify(body));

    const { conversation, sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "No sessionId" }, { status: 400 });
    }

    const safeConversation = conversation || [];

    const patientMessages = safeConversation
      .filter((msg: any) => msg.role === "user")
      .map((msg: any) => msg.content);

    const doctorMessages = safeConversation
      .filter((msg: any) => msg.role === "assistant")
      .map((msg: any) => msg.content);

    const report = {
      patientSummary: patientMessages.length > 0
        ? patientMessages.join(". ")
        : "Patient consulted with AI doctor.",
      symptoms: patientMessages.slice(0, 5).length > 0
        ? patientMessages.slice(0, 5)
        : ["Symptoms discussed during consultation"],
      diagnosis: doctorMessages.length > 0
        ? doctorMessages[doctorMessages.length - 1]
        : "Please consult a real doctor for proper diagnosis.",
      medicines: [
        {
          name: "As advised by doctor",
          dosage: "As directed",
          duration: "As directed",
        },
      ],
      advice: [
        "Take prescribed medicines on time",
        "Drink plenty of water",
        "Take proper rest",
        "Avoid junk food",
        "Visit a licensed doctor for proper treatment",
      ],
      followUp: "Please visit a real doctor within 2-3 days.",
      urgency: "medium",
    };

    console.log("Saving to DB with sessionId:", sessionId);

    try {
      await db
        .update(SessionChatTable)
        .set({
          conversation: safeConversation,
          report: report,
        })
        .where(eq(SessionChatTable.sessionId, sessionId));

      console.log("DB save successful");
    } catch (dbError: any) {
      console.error("DB error:", dbError.message);
      // Still return report even if DB fails
      return NextResponse.json({ report });
    }

    return NextResponse.json({ report });

  } catch (error: any) {
    console.error("Route error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}