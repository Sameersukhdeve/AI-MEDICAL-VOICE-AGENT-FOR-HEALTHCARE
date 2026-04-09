"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useUser, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

function BotSVG({ size = 160 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="90" width="100" height="95" rx="20" fill="#EAF3DE" stroke="#97C459" strokeWidth="2" />
      <rect x="35" y="28" width="90" height="70" rx="22" fill="#EAF3DE" stroke="#97C459" strokeWidth="2" />
      <line x1="80" y1="28" x2="80" y2="10" stroke="#97C459" strokeWidth="2" strokeLinecap="round" />
      <circle cx="80" cy="7" r="6" fill="#639922" />
      <circle cx="80" cy="7" r="3" fill="#EAF3DE">
        <animate attributeName="r" values="3;4.5;3" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="56" r="11" fill="white" stroke="#97C459" strokeWidth="1.5" />
      <circle cx="100" cy="56" r="11" fill="white" stroke="#97C459" strokeWidth="1.5" />
      <circle cx="60" cy="56" r="5" fill="#3B6D11" />
      <circle cx="100" cy="56" r="5" fill="#3B6D11" />
      <circle cx="62" cy="54" r="2" fill="white" />
      <circle cx="102" cy="54" r="2" fill="white" />
      <path d="M58 74 Q80 86 102 74" stroke="#639922" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="70" y="112" width="20" height="6" rx="3" fill="#639922" />
      <rect x="77" y="105" width="6" height="20" rx="3" fill="#639922" />
      <rect x="2" y="95" width="30" height="14" rx="7" fill="#EAF3DE" stroke="#97C459" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" values="-8 17 102;8 17 102;-8 17 102" dur="2.5s" repeatCount="indefinite" />
      </rect>
      <rect x="128" y="95" width="30" height="14" rx="7" fill="#EAF3DE" stroke="#97C459" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" values="8 143 102;-8 143 102;8 143 102" dur="2.5s" repeatCount="indefinite" />
      </rect>
      <rect x="44" y="178" width="28" height="18" rx="9" fill="#EAF3DE" stroke="#97C459" strokeWidth="1.5" />
      <rect x="88" y="178" width="28" height="18" rx="9" fill="#EAF3DE" stroke="#97C459" strokeWidth="1.5" />
      <rect x="50" y="140" width="60" height="36" rx="10" fill="white" stroke="#C0DD97" strokeWidth="1.5" />
      <line x1="58" y1="151" x2="102" y2="151" stroke="#97C459" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="158" x2="90" y2="158" stroke="#C0DD97" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="165" x2="95" y2="165" stroke="#C0DD97" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HeartbeatLine() {
  return (
    <svg viewBox="0 0 300 60" className="w-full max-w-xs opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 30 L50 30 L65 10 L80 50 L95 20 L110 40 L125 30 L300 30"
        stroke="#639922"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke-dasharray" values="0,600;600,0" dur="2.5s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function StethoscopeSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill="#EAF3DE" stroke="#97C459" strokeWidth="1.5" />
      <circle cx="28" cy="26" r="5" fill="none" stroke="#639922" strokeWidth="2" />
      <circle cx="52" cy="26" r="5" fill="none" stroke="#639922" strokeWidth="2" />
      <path d="M28 31 Q28 48 40 48 Q52 48 52 31" stroke="#639922" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M40 48 Q40 60 50 60" stroke="#639922" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="62" r="4" fill="#3B6D11" />
      <circle cx="50" cy="62" r="2" fill="#EAF3DE">
        <animate attributeName="r" values="2;3;2" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function PillSVG({ size = 70 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="33" fill="#EAF3DE" stroke="#97C459" strokeWidth="1.5" />
      <rect x="18" y="28" width="34" height="14" rx="7" fill="#97C459" />
      <rect x="18" y="28" width="17" height="14" rx="7" fill="#3B6D11" />
    </svg>
  );
}

/* ─── NAVBAR ─── */
const Navbar = () => {
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-green-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-200">
            <span className="text-white text-lg">🩺</span>
          </div>
          <span className="text-xl font-bold text-gray-800">
            Medi<span className="text-green-600">Voice AI</span>
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {["How It Works", "About", "Pricing"].map((item, i) => (
            <motion.a
              key={i}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="relative text-gray-500 text-sm font-medium hover:text-green-600 transition-colors group cursor-pointer"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-500 rounded-full group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {!user ? (
          <div className="flex gap-3">
            <Link href="/sign-in">
              <button className="px-4 py-2 rounded-xl text-gray-700 border border-gray-200 text-sm font-medium hover:border-green-400 hover:text-green-600 transition-all">
                Login
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold shadow-lg shadow-green-200 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Online
            </div>
            <Link href="/dashboard">
              <button className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold shadow-lg shadow-green-200 transition-all">
                Dashboard
              </button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </motion.nav>
  );
};

/* ─── DATA ─── */
const steps = [
  {
    number: "01",
    icon: "📲",
    title: "Patient Initiates Contact",
    desc: "The patient calls, chats, or messages your clinic. MediVoice AI instantly picks up — no hold music, no waiting.",
    border: "border-green-100",
    bg: "bg-green-50",
    iconBg: "bg-green-600",
  },
  {
    number: "02",
    icon: "🤖",
    title: "AI Greets & Assesses",
    desc: "The voice agent greets the patient by name, collects symptoms, and asks smart follow-up questions in real time.",
    border: "border-emerald-100",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-600",
  },
  {
    number: "03",
    icon: "⚡",
    title: "Triage & Instant Action",
    desc: "The AI classifies urgency, books the right appointment slot, or escalates directly to an on-call physician.",
    border: "border-teal-100",
    bg: "bg-teal-50",
    iconBg: "bg-teal-600",
  },
  {
    number: "04",
    icon: "📋",
    title: "Summary Sent to EHR",
    desc: "A clean structured note lands in your EHR before the patient even arrives. Zero manual documentation.",
    border: "border-green-100",
    bg: "bg-green-50",
    iconBg: "bg-green-700",
  },
];

const stats = [
  { value: "500+", label: "Clinics Onboarded", icon: "🏥" },
  { value: "2.4M+", label: "Patient Interactions", icon: "🤝" },
  { value: "40+", label: "Languages Supported", icon: "🌐" },
  { value: "98.4%", label: "Patient Satisfaction", icon: "⭐" },
];

const features = [
  { icon: "🎙️", title: "Voice-First AI", desc: "Natural conversations patients actually enjoy" },
  { icon: "🔒", title: "HIPAA Compliant", desc: "Enterprise-grade security and encryption" },
  { icon: "⚡", title: "Instant Triage", desc: "AI classifies urgency in under 3 seconds" },
  { icon: "📊", title: "EHR Integration", desc: "Works with your existing systems seamlessly" },
  { icon: "🌙", title: "24/7 Available", desc: "Never miss a patient call again" },
  { icon: "🌍", title: "40+ Languages", desc: "Serve every patient in their native tongue" },
];

/* ─── MAIN PAGE ─── */
export default function Home() {
  const words = "Transform Healthcare with AI Medical Voice Agents".split(" ");

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══════ HERO ══════ */}
      <section className="relative px-6 pt-16 pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-100 opacity-40 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-100 opacity-40 blur-3xl -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-green-50 opacity-60 blur-2xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#3B6D11" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-semibold mb-6"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                🩺 AI-Powered Healthcare — Live Now
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, ease: "easeOut" }}
                    className={`inline-block mr-2 ${
                      word === "AI" || word === "Healthcare" ? "text-green-600" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center lg:justify-start mb-6"
              >
                <HeartbeatLine />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
              >
                Provide 24/7 intelligent medical support using conversational AI. Triage symptoms,
                book appointments, and deliver empathetic care with voice-first automation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10"
              >
                <Link href="/sign-up">
                  <button className="px-8 py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base shadow-xl shadow-green-200 hover:shadow-green-300 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                    🚀 Get Started Free
                  </button>
                </Link>
                <a href="#how-it-works">
                  <button className="px-8 py-3.5 rounded-2xl border-2 border-green-200 text-green-700 font-semibold text-base hover:bg-green-50 transition-all duration-300 flex items-center gap-2">
                    ▶ See How It Works
                  </button>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap items-center gap-3 justify-center lg:justify-start"
              >
                {["🔒 HIPAA Compliant", "⭐ 4.9/5 Rating", "🏥 500+ Clinics", "🌐 40+ Languages"].map(
                  (badge, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full"
                    >
                      {badge}
                    </span>
                  )
                )}
              </motion.div>
            </div>

            {/* Right — Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-shrink-0 relative"
            >
              <div className="absolute inset-0 rounded-full bg-green-200 opacity-30 blur-3xl scale-110" />

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <BotSVG size={260} />
              </motion.div>

              {/* Floating info cards */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-8 bg-white border border-green-100 rounded-2xl px-4 py-3 shadow-lg shadow-green-100 flex items-center gap-2 z-20"
              >
                <span className="text-xl">🩺</span>
                <div>
                  <p className="text-[11px] font-bold text-gray-700">AI Triage</p>
                  <p className="text-[10px] text-green-500">Active</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], rotate: [2, -2, 2] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-2 -right-6 bg-white border border-green-100 rounded-2xl px-4 py-3 shadow-lg shadow-green-100 flex items-center gap-2 z-20"
              >
                <span className="text-xl">⚡</span>
                <div>
                  <p className="text-[11px] font-bold text-gray-700">Response Time</p>
                  <p className="text-[10px] text-green-500">&lt; 2 seconds</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-14 bg-white border border-green-100 rounded-2xl px-4 py-3 shadow-lg shadow-green-100 z-20"
              >
                <p className="text-[11px] font-bold text-gray-700">Patients Helped</p>
                <p className="text-lg font-black text-green-600">2.4M+</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                className="absolute -top-8 right-4 z-10"
              >
                <StethoscopeSVG size={52} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
                className="absolute bottom-0 -left-10 z-10"
              >
                <PillSVG size={48} />
              </motion.div>
            </motion.div>
          </div>

          {/* Dashboard image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl border-2 border-green-100 pointer-events-none z-10" />
            <Image
              src="/dashboard.png"
              alt="dashboard"
              width={1200}
              height={700}
              className="rounded-3xl w-full shadow-2xl shadow-green-100"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════ FEATURES STRIP ══════ */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl group-hover:bg-white/30 transition-all duration-200">
                  {f.icon}
                </div>
                <p className="text-white font-bold text-sm">{f.title}</p>
                <p className="text-green-100 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section id="how-it-works" className="px-6 py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-50 rounded-full blur-3xl opacity-60 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
              🔄 How It Works
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4">
              From first contact to{" "}
              <span className="text-green-600">EHR in seconds</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Four simple steps that eliminate the manual work your front desk does every single day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative rounded-3xl p-7 ${step.bg} border ${step.border} cursor-pointer group`}
              >
                <span className="absolute top-5 right-5 text-xs font-black text-gray-200 tracking-widest">
                  {step.number}
                </span>
                <div className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center text-2xl shadow-lg mb-5 group-hover:scale-110 transition-transform duration-200`}>
                  {step.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2 leading-snug">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-white border border-green-100 shadow-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-14 text-center"
          >
            <p className="text-gray-400 mb-4">
              Set up takes less than 10 minutes. No technical expertise required.
            </p>
            <Link href="/sign-up">
              <button className="px-8 py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-xl shadow-green-200 hover:-translate-y-0.5 transition-all duration-300">
                Try It Free →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      <section id="about" className="px-6 py-24 bg-gray-50/80">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-5"
          >
            <span className="px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
              🏥 About MediVoice AI
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                We're building the{" "}
                <span className="text-green-600">future of patient care</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                MediVoice AI was born from a simple frustration: patients waiting on hold,
                front-desk teams drowning in calls, and doctors buried in paperwork.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Our team of doctors, engineers, and AI researchers built a voice-first platform
                that understands clinical context, triages urgency, and takes real action inside
                your existing workflows.
              </p>
              <ul className="space-y-3">
                {[
                  "Trained on clinical protocols and medical literature",
                  "Integrates directly with your existing EHR system",
                  "HIPAA-compliant with end-to-end encryption",
                  "Supports 40+ languages including regional dialects",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                      ✓
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right — Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-5"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-green-100 rounded-3xl p-7 text-center shadow-sm hover:shadow-lg hover:shadow-green-100 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="text-4xl font-black text-green-600">{s.value}</p>
                  <p className="mt-2 text-sm font-medium text-gray-400">{s.label}</p>
                </motion.div>
              ))}

              {/* Mission card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="col-span-2 bg-green-600 rounded-3xl p-7 text-white shadow-xl shadow-green-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 opacity-10 text-8xl select-none pointer-events-none">
                  🧠
                </div>
                <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
                  <BotSVG size={120} />
                </div>
                <p className="text-xs font-bold text-green-200 mb-2 uppercase tracking-widest">
                  Our Mission
                </p>
                <p className="text-lg font-bold leading-relaxed relative z-10">
                  "Make intelligent, empathetic medical support accessible to every patient —
                  regardless of time, language, or location."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ CTA BANNER ══════ */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-green-600 rounded-3xl p-12 text-center overflow-hidden shadow-2xl shadow-green-200"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-700 rounded-full opacity-30 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block pointer-events-none"
            >
              <BotSVG size={180} />
            </motion.div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-200 rounded-full animate-pulse" />
                Ready in 10 minutes
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Start Transforming<br />Patient Care Today
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
                Join 500+ clinics already using MediVoice AI to deliver faster, smarter, and
                more compassionate healthcare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <button className="px-8 py-3.5 rounded-2xl bg-white text-green-700 font-bold text-base hover:bg-green-50 shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    🚀 Get Started Free
                  </button>
                </Link>
                <a href="#how-it-works">
                  <button className="px-8 py-3.5 rounded-2xl border-2 border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-gray-900 text-gray-400">
        <svg viewBox="0 0 1440 60" className="w-full -mb-px" fill="none" preserveAspectRatio="none">
          <path d="M0 60 C360 10 1080 10 1440 60 L1440 0 L0 0Z" fill="#f9fafb" />
        </svg>

        <div className="max-w-6xl mx-auto px-8 pt-16 pb-10">
          <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">

            {/* Brand */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🩺</span>
                </div>
                <span className="text-white font-bold text-xl">MediVoice AI</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                The future of patient-clinic communication. Intelligent, empathetic, and always
                available — 24 hours a day, 7 days a week.
              </p>

              {/* Social icons — FIXED */}
<div className="flex space-x-3">
  {[
    { icon: "𝕏", label: "X / Twitter" },
    { icon: "in", label: "LinkedIn" },
    { icon: "▶", label: "YouTube" },
    { icon: "◎", label: "Instagram" },
  ].map((s) => (
    <a
      key={s.label}
      href="#"
      aria-label={s.label}
      className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-sm hover:bg-green-600 hover:text-white transition-all duration-200"
    >
      {s.icon}
    </a>
  ))}
</div>

              {/* Newsletter */}
              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Stay in the loop
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 bg-gray-800 text-white text-sm rounded-xl px-4 py-2.5 border border-gray-700 focus:outline-none focus:border-green-500 placeholder-gray-500"
                  />
                  <button className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-all whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog", "API Docs"] },
                { title: "Use Cases", links: ["GP Clinics", "Hospitals", "Telemedicine", "Mental Health", "Dental"] },
                { title: "Company", links: ["About Us", "Blog", "Careers", "Press Kit", "Contact"] },
                { title: "Legal", links: ["Privacy Policy", "Terms of Service", "HIPAA", "Security", "Cookies"] },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="text-white text-xs font-bold mb-5 uppercase tracking-widest">
                    {col.title}
                  </h4>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm hover:text-green-400 transition-colors duration-150">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="py-8 border-b border-gray-800 flex flex-wrap gap-3 justify-center">
            {[
              "🔒 HIPAA Compliant",
              "✅ SOC 2 Type II",
              "🛡️ ISO 27001",
              "⭐ 4.9 / 5 Rating",
              "🌐 40+ Languages",
              "🏥 500+ Clinics",
            ].map((b) => (
              <span
                key={b}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-sm font-medium text-gray-300"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2025 MediVoice AI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">All systems operational</span>
              </span>
              <span>🇮🇳 Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}