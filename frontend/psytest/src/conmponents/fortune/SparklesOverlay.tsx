import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export function SparklesOverlay({
  count = 18,          // 입자 개수
  radius = 90,         // 원형으로 퍼지는 반경(px)
  duration = 1.8       // 애니메이션 1회 재생 시간(s)
}: { count?: number; radius?: number; duration?: number }) {
  const prefersReducedMotion = useReducedMotion();

  // 매 렌더마다 위치가 바뀌지 않도록 고정된 각/크기 시퀀스를 만든다.
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;          // 균등 각도
      const r = radius * (0.7 + (i % 5) * 0.06);        // 미세하게 다른 반경
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const size = 6 + ((i * 7) % 7);                   // 6~12px
      const delay = (i % 6) * 0.12;                     // 계단식 딜레이
      return { x, y, size, delay, angle };
    });
  }, [count, radius]);

  // 모션 축소 환경: 단순한 은은한 발광 원만 표시
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-full grid place-items-center">
        <div
          aria-label="로딩 중"
          className="pointer-events-none w-32 h-32 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.20) 40%, rgba(255,255,255,0.06) 65%, rgba(255,255,255,0.00) 70%)",
            filter: "blur(1px)"
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full grid place-items-center">
      {/* 중앙 글로우 */}
      <motion.div
        aria-label="로딩 중"
        className="pointer-events-none w-28 h-28 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(255,230,180,0.35) 45%, rgba(255,200,120,0.18) 60%, rgba(255,180,90,0.08) 70%, rgba(255,160,60,0.00) 80%)",
          boxShadow:
            "0 0 25px rgba(255,210,120,0.6), 0 0 60px rgba(255,200,120,0.35)"
        }}
        initial={{ opacity: 0.85, scale: 0.95 }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.04, 0.95] }}
        transition={{ duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 스파클 입자들 */}
      <div className="pointer-events-none absolute">
        {particles.map((p, idx) => (
          <motion.span
            key={idx}
            className="absolute rounded-full shadow"
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              width: p.size,
              height: p.size,
              // 노랑-오렌지 계열 느낌 (Tailwind 없이 inline으로 살짝)
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(255,230,150,0.9) 45%, rgba(255,190,80,0.8) 80%)",
              boxShadow:
                "0 0 8px rgba(255,210,120,0.9), 0 0 14px rgba(255,190,80,0.35)"
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.6, 1.25, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 미세한 반짝임 입자 (작은 점들이 천천히 깜빡) */}
      <div className="pointer-events-none absolute">
        {particles.slice(0, Math.ceil(count / 2)).map((p, idx) => (
          <motion.span
            key={`twinkle-${idx}`}
            className="absolute rounded-full"
            style={{
              left: `calc(50% + ${p.x * 0.6}px)`,
              top: `calc(50% + ${p.y * 0.6}px)`,
              width: 3,
              height: 3,
              background: "rgba(255,255,255,0.9)",
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))"
            }}
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{ opacity: [0.15, 0.9, 0.2], scale: [1, 1.6, 1] }}
            transition={{
              duration: duration * 1.6,
              delay: p.delay * 0.7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}