import { motion } from "framer-motion";

const STAGGER = 0.035;

const TextRoll = ({ text }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className="relative inline-block overflow-hidden text-sm uppercase font-medium"
      style={{ lineHeight: 1 }}
    >
      {/* Top text */}
      <span className="block">
        {text.split("").map((letter, i) => {
          const delay =
            STAGGER * Math.abs(i - (text.length - 1) / 2);

          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </span>

      {/* Bottom text */}
      <span className="absolute inset-0">
        {text.split("").map((letter, i) => {
          const delay =
            STAGGER * Math.abs(i - (text.length - 1) / 2);

          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
};

export default TextRoll;
