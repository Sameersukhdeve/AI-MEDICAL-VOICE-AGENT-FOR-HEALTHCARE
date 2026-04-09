"use client";
import { motion } from "motion/react";

export default function AIParticles() {
  const particles = new Array(20).fill(0);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            y: 0,
            x: Math.random() * 1000,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: -800,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="absolute w-2 h-2 bg-violet-400 rounded-full blur-sm"
        />
      ))}
    </div>
  );
}