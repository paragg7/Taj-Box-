import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SpotlightSweep = ({ active }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        >
          {/* Soft dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />

          {/* Moving spotlight beam */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 w-[40%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpotlightSweep;
