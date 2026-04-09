"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type Medicine = {
  name: string;
  dosage: string;
  duration: string;
};

type Report = {
  patientSummary: string;
  symptoms: string[];
  diagnosis: string;
  medicines: Medicine[];
  advice: string[];
  followUp: string;
  urgency: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "connected">("idle");
  const [assistantMsg, setAssistantMsg] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [timer, setTimer] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    vapiRef.current = new Vapi("94855dea-e2de-4f25-82b3-b9d2bc0fca2f");

    vapiRef.current.on("call-start", () => {
      setCallStatus("connected");
      setErrorMsg("");
      setConversation([]);
    });

    vapiRef.current.on("call-end", () => {
      setCallStatus("idle");
      setTimer(0);
    });

    vapiRef.current.on("error", (error: any) => {
      console.log("Vapi error:", error);
      setCallStatus("idle");
      setTimer(0);
      setErrorMsg("Call failed. Please try again.");
    });

    vapiRef.current.on("message", (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        if (message.role === "assistant") {
          setAssistantMsg(message.transcript);
          setConversation((prev) => [
            ...prev,
            { role: "assistant", content: message.transcript },
          ]);
        } else if (message.role === "user") {
          setUserMsg(message.transcript);
          setConversation((prev) => [
            ...prev,
            { role: "user", content: message.transcript },
          ]);
        }
      }
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (sessionId) GetSessionDetails();
  }, [sessionId]);

  useEffect(() => {
    let interval: any;
    if (callStatus === "connected") {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
      setSessionDetails(result.data);
      // Load existing report if any
      if (result.data?.report) {
        setReport(result.data.report);
      }
    } catch (error) {
      console.error("Session fetch error:", error);
    }
  };

  const StartCall = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setErrorMsg("");
      setCallStatus("connecting");
      setAssistantMsg("");
      setUserMsg("");
      setReport(null);
      setConversation([]);
      await vapiRef.current.start("a3c86301-72d3-44b1-bb35-4e4e121ceea6");
    } catch (error: any) {
      console.error("Start call error:", error);
      setCallStatus("idle");
      if (error.name === "NotAllowedError") {
        setErrorMsg("Microphone blocked. Please allow microphone and try again.");
      } else {
        setErrorMsg("Could not start call. Please try again.");
      }
    }
  };

  const EndCall = async () => {
    try {
      vapiRef.current.stop();
      setCallStatus("idle");
      setTimer(0);

      // Generate report after call ends
      if (conversation.length > 0) {
        setGeneratingReport(true);
        const result = await axios.post("/api/generate-report", {
          conversation,
          sessionId,
        });
        setReport(result.data.report);
        setGeneratingReport(false);
      }
    } catch (error) {
      console.error("End call error:", error);
      setGeneratingReport(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const downloadReport = () => {
    if (!report) return;
    const doctor = sessionDetails?.selectedDoctor;
    const content = `
MEDICAL CONSULTATION REPORT
============================
Date: ${new Date().toLocaleDateString()}
Doctor: ${doctor?.specialist ?? "AI Doctor"}
Patient Symptoms: ${sessionDetails?.notes ?? ""}

SUMMARY
-------
${report.patientSummary}

SYMPTOMS REPORTED
-----------------
${report.symptoms.map((s: string) => `• ${s}`).join("\n")}

DIAGNOSIS
---------
${report.diagnosis}

MEDICINES PRESCRIBED
---------------------
${report.medicines.map((m: Medicine) => `• ${m.name} - ${m.dosage} - ${m.duration}`).join("\n")}

ADVICE
------
${report.advice.map((a: string) => `• ${a}`).join("\n")}

FOLLOW UP
---------
${report.followUp}

URGENCY LEVEL: ${report.urgency?.toUpperCase()}

============================
FULL CONVERSATION
============================
${conversation.map((m) => `${m.role === "assistant" ? "Doctor" : "Patient"}: ${m.content}`).join("\n\n")}

============================
DISCLAIMER: This is an AI-generated report. 
Please consult a licensed doctor for proper medical advice.
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medical-report-${new Date().toLocaleDateString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const doctor = sessionDetails?.selectedDoctor;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">

          {/* Status + Timer */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                callStatus === "connected" ? "bg-green-500 border-green-500"
                : callStatus === "connecting" ? "bg-yellow-400 border-yellow-400"
                : "bg-white border-gray-400"
              }`} />
              <span className="text-sm text-gray-500">
                {callStatus === "connected" ? "Connected"
                  : callStatus === "connecting" ? "Connecting..."
                  : "Not Connected"}
              </span>
            </div>
            <span className="text-sm text-gray-400 font-mono">
              {formatTime(timer)}
            </span>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4 text-center">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Doctor */}
          <div className="flex flex-col items-center mb-6">
            <div className={`w-28 h-28 rounded-full overflow-hidden border-4 shadow mb-4 transition-all ${
              callStatus === "connected" ? "border-green-400 shadow-green-100" : "border-gray-100"
            }`}>
              {doctor?.image ? (
                <Image src={doctor.image} alt={doctor.specialist ?? "Doctor"}
                  width={112} height={112} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-5xl">👨‍⚕️</div>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{doctor?.specialist ?? "Loading..."}</h2>
            <p className="text-sm text-gray-400 mt-1">AI Medical Voice Agent</p>
          </div>

          {/* Symptoms */}
          {sessionDetails?.notes && (
            <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm text-gray-500 text-center">
              <span className="font-semibold text-gray-700">Symptoms: </span>
              {sessionDetails.notes}
            </div>
          )}

          {/* Live transcript */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 min-h-[80px] space-y-3">
            <div className="text-center">
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">Assistant</p>
              <p className="text-sm text-gray-600">{assistantMsg || "—"}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-1">You</p>
              <p className="text-sm text-gray-800 font-medium">{userMsg || "—"}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center">
            {callStatus === "idle" && !generatingReport && (
              <button onClick={StartCall}
                className="flex items-center gap-2 px-10 py-3 rounded-full font-semibold text-white bg-gray-800 hover:bg-gray-700 shadow-lg transition-all">
                📞 Start Call
              </button>
            )}
            {callStatus === "connecting" && (
              <button disabled
                className="flex items-center gap-2 px-10 py-3 rounded-full font-semibold text-white bg-yellow-400 shadow-lg cursor-not-allowed">
                ⏳ Connecting...
              </button>
            )}
            {callStatus === "connected" && (
              <button onClick={EndCall}
                className="flex items-center gap-2 px-10 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 shadow-lg transition-all">
                📵 End Call
              </button>
            )}
            {generatingReport && (
              <div className="flex items-center gap-2 px-10 py-3 rounded-full font-semibold text-white bg-blue-500 shadow-lg">
                ⏳ Generating Report...
              </div>
            )}
          </div>

        </div>

        {/* REPORT SECTION */}
        {report && (
          <div className="bg-white rounded-3xl shadow-lg p-8">

            {/* Report Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Medical Report</h2>
                <p className="text-sm text-gray-400 mt-1">{new Date().toLocaleDateString()}</p>
              </div>
              <button onClick={downloadReport}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                ⬇️ Download
              </button>
            </div>

            {/* Urgency Badge */}
            <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-6 ${
              report.urgency === "high" ? "bg-red-100 text-red-600"
              : report.urgency === "medium" ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
            }`}>
              Urgency: {report.urgency?.toUpperCase()}
            </div>

            {/* Summary */}
            <div className="bg-blue-50 rounded-2xl p-5 mb-5">
              <h3 className="font-bold text-blue-900 mb-2">📋 Summary</h3>
              <p className="text-sm text-blue-800">{report.patientSummary}</p>
            </div>

            {/* Symptoms */}
            {report.symptoms?.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-5 mb-5">
                <h3 className="font-bold text-gray-800 mb-3">🤒 Symptoms</h3>
                <ul className="space-y-1">
                  {report.symptoms.map((s: string, i: number) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Diagnosis */}
            <div className="bg-orange-50 rounded-2xl p-5 mb-5">
              <h3 className="font-bold text-orange-900 mb-2">🔍 Diagnosis</h3>
              <p className="text-sm text-orange-800">{report.diagnosis}</p>
            </div>

            {/* Medicines */}
            {report.medicines?.length > 0 && (
              <div className="bg-green-50 rounded-2xl p-5 mb-5">
                <h3 className="font-bold text-green-900 mb-3">💊 Medicines</h3>
                <div className="space-y-2">
                  {report.medicines.map((m: Medicine, i: number) => (
                    <div key={i} className="bg-white rounded-xl p-3 flex justify-between items-center">
                      <span className="font-semibold text-sm text-gray-800">{m.name}</span>
                      <span className="text-xs text-gray-500">{m.dosage}</span>
                      <span className="text-xs text-green-600 font-medium">{m.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advice */}
            {report.advice?.length > 0 && (
              <div className="bg-purple-50 rounded-2xl p-5 mb-5">
                <h3 className="font-bold text-purple-900 mb-3">💡 Advice</h3>
                <ul className="space-y-1">
                  {report.advice.map((a: string, i: number) => (
                    <li key={i} className="text-sm text-purple-800 flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Follow Up */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-5">
              <h3 className="font-bold text-gray-800 mb-2">📅 Follow Up</h3>
              <p className="text-sm text-gray-600">{report.followUp}</p>
            </div>

            {/* Full Conversation */}
            {conversation.length > 0 && (
              <div className="border rounded-2xl p-5">
                <h3 className="font-bold text-gray-800 mb-4">💬 Full Conversation</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {conversation.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        <p className="text-xs opacity-70 mb-1">
                          {msg.role === "user" ? "You" : "Doctor"}
                        </p>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
              <p className="text-xs text-yellow-700">
                ⚠️ This is an AI-generated report. Please consult a licensed doctor for proper medical advice.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default MedicalVoiceAgent;
