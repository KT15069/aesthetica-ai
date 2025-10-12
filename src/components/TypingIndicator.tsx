import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        animate={{
          y: [0, -8, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        animate={{
          y: [0, -8, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        animate={{
          y: [0, -8, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  );
}
