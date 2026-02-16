import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.25, 1, 0.5, 1];

const ExpandingCarousel = ({
  images = [],
  autoPlay = true,
  interval = 3000,
  activeWidth = 520,
  inactiveWidth = 260,
  height = 420,
}) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height }}
    >
      <div className="flex items-center gap-6">
        {images.map((img, i) => {
          const isActive = i === active;

          return (
            <motion.div
              key={i}
              layout
              animate={{
                width: isActive ? activeWidth : inactiveWidth,
                opacity: isActive ? 1 : 0.45,
                filter: isActive ? "blur(0px)" : "blur(1px)",
              }}
              transition={{
                layout: { duration: 0.6, ease },
                duration: 0.6,
                ease,
              }}
              className="relative overflow-hidden rounded-3xl"
              style={{ height }}
              onClick={() => setActive(i)}
            >
              <img
                src={img}
                className="h-full w-full object-cover select-none"
                draggable={false}
                alt=""
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandingCarousel;
