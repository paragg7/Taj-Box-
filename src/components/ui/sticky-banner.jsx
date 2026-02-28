"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false,
}) => {
  const [open, setOpen] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnScroll && latest > 40) setOpen(false);
    else setOpen(true);
  });

  if (!open) return null;

  return (
    <motion.div
      className={cn(
        // sticky positioning
        "sticky inset-x-0 top-0 z-40 w-full",
        // styling
        "bg-black text-white",
        // avoid layout shifting + better mobile behavior
        "supports-[backdrop-filter]:backdrop-blur",
        className
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div
        className={cn(
          // container width
          "mx-auto w-full max-w-7xl",
          // responsive padding
          "px-3 sm:px-4 md:px-6",
          // layout
          "flex items-start sm:items-center justify-center",
          // spacing + allow wrap on small screens
          "py-2 sm:py-2.5"
        )}
      >
        {/* Content area */}
        <div
          className={cn(
            // give space so close button never overlaps content
            "w-full pr-10 sm:pr-12",
            // center on small, inline on larger
            "text-center ",
            // wrap nicely
            "text-xs sm:text-sm md:text-base",
            "leading-snug sm:leading-normal",
            "break-words"
          )}
        >
          {children}
        </div>

        {/* Close button (touch friendly) */}
        <button
          type="button"
          aria-label="Close banner"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2",
            "inline-flex items-center justify-center",
            // 44x44 tap target
            "h-11 w-11",
            "rounded-md",
            "text-white/80 hover:text-white",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          )}
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};