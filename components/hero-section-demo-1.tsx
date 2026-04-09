"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function HeroSectionOne() {
  return (
    <section className="relative overflow-hidden bg-white">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#dcfce7,_white_40%)]" />

      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl"
            >
              AI Medical Voice Agents
              <span className="block text-green-600">
                For Smarter Healthcare
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 max-w-xl text-lg text-neutral-600 leading-relaxed"
            >
              24/7 AI-powered medical assistant for real-time transcription,
              error detection, sentiment monitoring, and intelligent diagnosis support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex gap-6"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg shadow-lg shadow-green-200 rounded-xl">
                Get Started
              </Button>

              <Button
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 text-lg rounded-xl"
              >
                View Features
              </Button>
            </motion.div>

          </div>

          {/* RIGHT PREMIUM IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl shadow-neutral-200">

              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
                alt="Doctor using AI system"
                width={600}
                height={600}
                className="rounded-2xl object-cover"
              />

              {/* Floating AI Badge */}
              <div className="absolute -top-6 -right-6 rounded-2xl bg-green-600 px-6 py-4 text-white shadow-xl">
                <p className="text-sm font-semibold">AI Powered</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <div className="flex items-center gap-3">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Logo"
            width={36}
            height={36}
          />
          <h1 className="text-xl font-semibold text-slate-900">
            MediVoice AI
          </h1>
        </div>

        <div className="hidden gap-8 text-sm font-medium text-neutral-600 md:flex">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
        </div>

        <Button className="bg-black text-white hover:bg-neutral-800 px-6 py-5 rounded-xl">
          Login
        </Button>

      </div>
    </nav>
  );
};
