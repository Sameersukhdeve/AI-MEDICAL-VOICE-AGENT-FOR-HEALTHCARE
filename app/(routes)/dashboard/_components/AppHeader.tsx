"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

const menuOptions = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "History", path: "/history" },
  { id: 3, name: "Blog", path: "/blog" },
  { id: 4, name: "Pricing", path: "/pricing" },
];

function AppHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 xl:px-56 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-green-100"
          : "bg-white shadow-sm"
      }`}
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
        <Image src="/logo.svg" alt="logo" width={160} height={50} />
      </motion.div>

      {/* Nav */}
      <div className="hidden md:flex gap-10 items-center">
        {menuOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Link href={option.path}>
              <span className="relative text-gray-600 font-medium hover:text-green-600 transition-colors duration-200 group cursor-pointer">
                {option.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 rounded-full group-hover:w-full transition-all duration-300" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* User */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs text-green-600 font-medium hidden md:block">Online</span>
        <UserButton />
      </motion.div>
    </motion.div>
  );
}

export default AppHeader;