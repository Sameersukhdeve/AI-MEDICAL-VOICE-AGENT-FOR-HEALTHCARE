"use client";
import React from "react";
import Image from "next/image";
import { doctorAgent } from "./DoctorAgentCard";
import { motion } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";

type props = {
  doctorAgent: doctorAgent;
  setSelectedDoctor: any;
  selectedDoctor?: doctorAgent;
};

function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, selectedDoctor }: props) {
  const isSelected = selectedDoctor?.id === doctorAgent?.id;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setSelectedDoctor(doctorAgent)}
      className={`relative flex flex-col items-center rounded-2xl p-4 cursor-pointer transition-all duration-200 border-2
        ${isSelected
          ? "border-green-500 bg-green-50 shadow-lg shadow-green-100"
          : "border-gray-100 bg-white hover:border-green-300 shadow-sm"
        }`}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-0.5"
        >
          <IconCheck size={12} />
        </motion.div>
      )}

      {/* Avatar */}
      <div className={`relative w-14 h-14 rounded-full overflow-hidden border-2 ${isSelected ? "border-green-400" : "border-gray-200"}`}>
        <Image
          src={doctorAgent?.image}
          alt={doctorAgent?.specialist}
          fill
          className="object-cover object-top"
        />
      </div>

      <h2 className={`font-bold text-sm text-center mt-2 ${isSelected ? "text-green-700" : "text-gray-800"}`}>
        {doctorAgent?.specialist}
      </h2>

      <p className="text-xs text-gray-400 text-center line-clamp-2 mt-0.5 leading-relaxed">
        {doctorAgent?.description}
      </p>
    </motion.div>
  );
}

export default SuggestedDoctorCard;