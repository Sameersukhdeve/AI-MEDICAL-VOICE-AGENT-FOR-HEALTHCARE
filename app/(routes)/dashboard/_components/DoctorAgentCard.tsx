"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconStethoscope } from "@tabler/icons-react";
import { motion } from "framer-motion";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type props = {
  doctorAgent: doctorAgent;
  onClick?: () => void;
};

function DoctorAgentCard({ doctorAgent, onClick }: props) {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    setRotateX(((y - centerY) / centerY) * -8);
    setRotateY(((x - centerX) / centerX) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHovered(false);
  };

  return (
    <motion.div
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer
        ${hovered ? "shadow-2xl shadow-green-200 border-green-400" : "shadow-md border-gray-100"}
      `}
    >
      {/* Glow overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />

      {/* Badge */}
      <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
        <IconStethoscope size={10} />
        AI Doctor
      </div>

      {/* Portrait Image Container */}
      <div className="relative w-full h-[220px] overflow-hidden bg-gradient-to-b from-green-50 to-gray-100">
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.specialist}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 pt-2">
        <h2 className="font-bold text-gray-800 text-base mt-1">{doctorAgent.specialist}</h2>
        <p className="line-clamp-2 text-xs text-gray-500 mt-1 leading-relaxed">
          {doctorAgent.description}
        </p>

        <Button
          onClick={onClick}
          className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold shadow-lg shadow-green-200 transition-all duration-300 group-hover:shadow-green-300"
        >
          Start Consultation
          <IconArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}

export default DoctorAgentCard;