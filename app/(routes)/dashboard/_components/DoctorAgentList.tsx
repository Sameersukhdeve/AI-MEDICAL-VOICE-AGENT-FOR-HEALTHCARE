"use client";
import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";
import { motion } from "framer-motion";
import { IconHeartbeat } from "@tabler/icons-react";

function DoctorsAgentList() {
  return (
    <div className="mt-14">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-2 bg-green-100 rounded-xl">
          <IconHeartbeat className="text-green-600" size={24} />
        </div>
        <div>
          <h2 className="font-bold text-2xl text-gray-800">AI Specialist Doctors</h2>
          <p className="text-sm text-gray-500">Choose your specialist and start consultation instantly</p>
        </div>
      </motion.div>

      {/* Decorative line */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-1 w-12 bg-green-500 rounded-full" />
        <div className="h-1 w-6 bg-green-300 rounded-full" />
        <div className="h-1 w-3 bg-green-200 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {AIDoctorAgents.map((doctor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: "easeOut",
            }}
          >
            <DoctorAgentCard doctorAgent={doctor} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsAgentList;