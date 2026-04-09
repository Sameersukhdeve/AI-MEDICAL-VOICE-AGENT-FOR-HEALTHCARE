"use client";

import React from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-7xl mx-auto">
      <BentoGridItem
        title="AI Medical Notes"
        description="Automatically generate structured clinical notes."
        header={<SkeletonOne />}
        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
      />

      <BentoGridItem
        title="Smart Reports"
        description="Instant summaries from patient interactions."
        header={<SkeletonTwo />}
        icon={<IconFileBroken className="h-4 w-4 text-neutral-500" />}
      />

      <BentoGridItem
        title="Secure Signatures"
        description="Doctor-ready verification system."
        header={<SkeletonThree />}
        icon={<IconSignature className="h-4 w-4 text-neutral-500" />}
      />

      <BentoGridItem
        title="Analytics Dashboard"
        description="Visualize patient & clinic insights."
        header={<SkeletonFour />}
        icon={<IconTableColumn className="h-4 w-4 text-neutral-500" />}
      />
    </BentoGrid>
  );
}

export default FeatureBentoGrid;


// --------------------
// Skeleton One
// --------------------
const SkeletonOne = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200" />
  );
};


// --------------------
// Seeded Random Generator (KEY FIX)
// --------------------
function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}


// --------------------
// Skeleton Two (Same visuals, hydration-safe)
// --------------------
const SkeletonTwo = () => {
  const variants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 0.3 },
    },
    hover: {
      width: ["0%", "100%"],
      transition: { duration: 2 },
    },
  };

  // ✅ Deterministic widths (same on server + client)
  const widths = React.useMemo(() => {
    return new Array(6).fill(0).map((_, i) => {
      const rand = seededRandom(i + 1);
      return rand * (100 - 40) + 40; // between 40% - 100%
    });
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2"
    >
      {widths.map((w, i) => (
        <motion.div
          key={"skeleton-two-" + i}
          variants={variants}
          style={{ maxWidth: `${w}%` }}
          className="rounded-full bg-neutral-200 dark:bg-neutral-800 w-full h-4"
        />
      ))}
    </motion.div>
  );
};


// --------------------
// Skeleton Three
// --------------------
const SkeletonThree = () => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-200 dark:bg-neutral-800"
    />
  );
};


// --------------------
// Skeleton Four
// --------------------
const SkeletonFour = () => {
  return (
    <div className="grid grid-cols-3 gap-2 flex-1 w-full h-full min-h-[6rem]">
      {new Array(6).fill(0).map((_, i) => (
        <div
          key={"skeleton-four-" + i}
          className="rounded-lg bg-neutral-200 dark:bg-neutral-800"
        />
      ))}
    </div>
  );
};