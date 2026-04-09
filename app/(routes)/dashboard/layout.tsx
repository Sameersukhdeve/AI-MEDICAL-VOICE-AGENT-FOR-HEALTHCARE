import React from 'react'
import AppHeader from '@/app/(routes)/dashboard/_components/AppHeader';
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

// In your <html> tag, add: className={playfair.variable}

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <AppHeader></AppHeader>
        <div className="px-10 md:px-20 lg:px-40 py-10">
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout