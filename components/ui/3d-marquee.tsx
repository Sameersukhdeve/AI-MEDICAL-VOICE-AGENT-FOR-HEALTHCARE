"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

interface ThreeDMarqueeProps {
  images: string[];
}

export function ThreeDMarquee({ images }: ThreeDMarqueeProps) {
  const [mounted, setMounted] = useState(false);

  // Mouse tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateY.set((x - centerX) / 40);
    rotateX.set(-(y - centerY) / 40);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto mt-32 h-[650px] max-w-7xl overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 shadow-[0_60px_150px_-30px_rgba(0,0,0,0.25)]"
    >
      {/* Hologram glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_60%)]" />

      {/* Sliding Track */}
      <motion.div
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
        }}
        className="absolute inset-0 flex items-center"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
          className="flex gap-12"
        >
          {[...images, ...images].map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="relative h-80 w-56 rounded-3xl bg-white border border-neutral-200 shadow-2xl shadow-neutral-300"
            >
              {/* Glow under card */}
              <div className="absolute -bottom-8 left-1/2 h-10 w-40 -translate-x-1/2 rounded-full bg-green-400/30 blur-2xl" />

              {/* Breathing animation */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative h-full w-full"
              >
                <Image
                  src={src}
                  alt="Doctor AI"
                  fill
                  className="rounded-3xl object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glass overlay */}
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
