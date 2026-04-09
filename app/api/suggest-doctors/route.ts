import { NextResponse } from "next/server";
import { AIDoctorAgents } from "@/shared/list";

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();
    const lower = notes?.toLowerCase() ?? "";

    const suggested = AIDoctorAgents.filter((doc) => {
      if (lower.includes("chest") || lower.includes("heart") || lower.includes("pressure"))
        return doc.specialist === "Cardiologist";
      if (lower.includes("headache") || lower.includes("dizzy") || lower.includes("seizure") || lower.includes("memory") || lower.includes("brain"))
        return doc.specialist === "Neurologist";
      if (lower.includes("skin") || lower.includes("rash") || lower.includes("acne"))
        return doc.specialist === "Dermatologist";
      if (lower.includes("bone") || lower.includes("joint") || lower.includes("back") || lower.includes("knee"))
        return doc.specialist === "Orthopedic";
      if (lower.includes("child") || lower.includes("baby") || lower.includes("kid"))
        return doc.specialist === "Pediatrician";
      return doc.specialist === "General Physician";
    });

    const result = suggested.length > 0 ? suggested : AIDoctorAgents.slice(0, 2);
    return NextResponse.json(result);
  } catch (error) {
    console.error("suggest-doctors error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}