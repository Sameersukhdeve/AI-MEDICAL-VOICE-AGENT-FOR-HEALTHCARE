"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconSparkles, IconClock, IconArrowRight } from "@tabler/icons-react";
import AddNewSessionDialog from "./AddNewSessionDialog";

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);

  return (
    <div className="mt-8">
      {historyList.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex flex-col items-center justify-center p-12 overflow-hidden
            rounded-3xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-emerald-50
            shadow-xl shadow-green-100"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300 rounded-full opacity-20 blur-2xl" />

          {/* Floating dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-300 rounded-full opacity-40"
              style={{
                top: `${20 + i * 12}%`,
                left: `${10 + i * 14}%`,
              }}
              animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Image */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-300 rounded-full blur-2xl opacity-30 scale-110" />
              <Image
                src="/medical-ass.png"
                alt="empty"
                width={160}
                height={160}
                className="relative z-10 drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 text-center mt-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <IconClock className="text-green-500" size={18} />
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                No History Yet
              </span>
            </div>
            <h2 className="font-bold text-2xl text-gray-800 mb-2">No Recent Consultations</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
              It looks like you haven't consulted with any doctors yet. Start your first AI consultation now!
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-6"
          >
            <AddNewSessionDialog />
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative z-10 flex items-center gap-6 mt-8 pt-6 border-t border-green-100 w-full justify-center"
          >
            {[
              { label: "AI Doctors", value: "10+" },
              { label: "Specialties", value: "8+" },
              { label: "Available", value: "24/7" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-bold text-xl text-green-600">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <div>List</div>
      )}
    </div>
  );
}

export default HistoryList;