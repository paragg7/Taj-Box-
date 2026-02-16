import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Hello", "नमस्कार","ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ" ,"Ram Ram" ];

const Preloader = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // 🔒 Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ⏱ Word sequence timing
  useEffect(() => {
    if (index < words.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 350);

      return () => clearTimeout(timer);
    } else {
      const endTimer = setTimeout(() => {
        setVisible(false);
        onFinish();
      }, 350);

      return () => clearTimeout(endTimer);
    }
  }, [index, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAF9F6]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}          // ✅ fade only
          transition={{ duration: 0.6 }} // smooth fade
        >
          <motion.div
            key={words[index]}
            className="text-4xl font-playfair font-bold tracking-wide text-black"
          >
            {words[index]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
