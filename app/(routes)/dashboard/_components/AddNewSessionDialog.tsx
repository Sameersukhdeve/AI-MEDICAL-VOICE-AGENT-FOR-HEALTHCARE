"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2, Sparkles, Plus } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const router = useRouter();

  const onClickNext = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/suggest-doctors", { notes: note });
      setSuggestedDoctors(result.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });
    if (result.data?.sessionId) {
      router.push("/dashboard/medical-agent/" + result.data.sessionId);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="mt-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600
            hover:to-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg
            shadow-green-200 hover:shadow-green-300 transition-all duration-300 flex items-center gap-2"
        >
          <Plus size={16} />
          Start a Consultation
          <Sparkles size={14} className="opacity-80" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg rounded-2xl border-0 shadow-2xl p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 pb-8">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold flex items-center gap-2">
              <Sparkles size={20} />
              Start a Consultation
            </DialogTitle>
            <DialogDescription className="text-green-100 text-sm mt-1">
              Describe your symptoms and we'll match you with the right specialist.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="p-6 -mt-4 bg-white rounded-t-3xl">
          <AnimatePresence mode="wait">
            {suggestedDoctors.length === 0 ? (
              <motion.div
                key="textarea"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Describe your symptoms or concerns
                </label>
                <Textarea
                  placeholder="E.g. I have a persistent headache for 3 days, mild fever..."
                  className="h-[160px] mt-1 border-gray-200 focus:border-green-400 focus:ring-green-400
                    rounded-xl resize-none text-sm"
                  onChange={(e) => setNote(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-2">
                  The more detail you provide, the better we can match you with the right doctor.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="doctors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-green-500" />
                  Recommended Specialists
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {suggestedDoctors.map((doctor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SuggestedDoctorCard
                        doctorAgent={doctor}
                        selectedDoctor={selectedDoctor}
                        setSelectedDoctor={setSelectedDoctor}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 bg-white flex gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 flex-1">
              Cancel
            </Button>
          </DialogClose>

          {suggestedDoctors.length === 0 ? (
            <Button
              disabled={!note || loading}
              onClick={onClickNext}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600
                hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-green-200"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Find Doctors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              disabled={!selectedDoctor || loading}
              onClick={onStartConsultation}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600
                hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-green-200"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Start Consultation"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;