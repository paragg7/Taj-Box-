"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyBanner = ({
  className,
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
        "sticky inset-x-0 top-0 z-40 w-full bg-[#EAE8E2] text-[#1E2220]",
        className
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="relative mx-auto w-full max-w-8xl px-4 py-2 flex items-center justify-center">
        
        {/* Centered Content */}
        <div className="text-center text-xs sm:text-sm md:text-base  leading-snug pr-12">
          Planning a bulk order? Call or WhatsApp us at{" "}
          <a
            href="tel:+919468480991"
            className="whitespace-nowrap font-bold underline underline-offset-4 "
          >
            +91 94684 80991
          </a>
        </div>

        {/* Close Button */}
        <button
          type="button"
          aria-label="Close banner"
          onClick={() => setOpen(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center text-[#1E2220]/80 hover:text-[#1E2220] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/60"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};