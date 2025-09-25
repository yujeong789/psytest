import { motion } from "framer-motion";

export function Sparkle({
   x, y, size, delay 
  }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.span
      className="absolute pointer-events-none drop-shadow-[0_0_6px_rgba(255,200,100,0.8)]"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: [0.8, 1.25, 0.9], opacity: [0, 1, 0.2], rotate: [0, 180, 360] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FFE29A"/>
            <stop offset="60%" stopColor="#FFC66A"/>
            <stop offset="100%" stopColor="#FF9F43"/>
          </radialGradient>
        </defs>
        <path d="M12 2 L14.5 8.5 L22 12 L14.5 15.5 L12 22 L9.5 15.5 L2 12 L9.5 8.5 Z" fill="url(#g)"/>
      </svg>
    </motion.span>
  );
}