// src/pages/fortune/FortunePage.tsx
import { useNavigate } from "react-router-dom";
import cookieImg from "@/assets/cookie.svg";
import cookieGif from "@/assets/cookie.gif";
import { postFortuneCookieOpen } from "@/lib/api/fortune";
import { useState } from "react";
import { motion } from "framer-motion";

function Sparkle({
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

export default function FortunePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleOpenCookie = async () => {
      try {
        setLoading(true);
        const data = await postFortuneCookieOpen(); // API 호출
        // 결과 페이지로 데이터 넘기기 (state 사용)
        navigate("/fortuneCookieResult", { state: { fortune: data } });
      } catch (error) {
        console.error("쿠키 불러오기 실패:", error);
        alert("운세를 가져올 수 없습니다. 다시 시도해주세요!");
      } finally {
        setLoading(false);
      }
    };

    const SPARKLES = [
      { x: -90, y: -10, size: 14, delay: 0.0 }, 
      {x: 90, y: -5, size: 12, delay: 0.3 }, 
      { x: -70, y: 70, size: 10, delay: 0.6 }, 
      { x: 80, y: 60, size: 16, delay: 0.9 }, 
      { x: 0, y: -80, size: 10, delay: 1.2 }, 
      { x: -100, y: -12, size: 22, delay: 0.0 }, 
      { x: 102, y: -8, size: 20, delay: 0.25 }, 
      { x: -78, y: 78, size: 18, delay: 0.5 }, 
      { x: 92, y: 72, size: 24, delay: 0.8 }, 
      { x: 0, y: -92, size: 18, delay: 1.1 },
    ]

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">

      {/* <div className="absolute top-4 left-4 flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
        >
          목록보기
        </button>
      </div> */}
      <div>
        <motion.button
          onClick={handleOpenCookie}
          disabled={loading}
          className="relative outline-none rounded-2xl p-2 transition transform disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="행운의 쿠키 열어보기"
          // 살짝 둥둥 떠다니기 + 기울기
          animate={{y: [0, -12, 0], rotate: [0, 2, 0, -2, 0]}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ 
            scale: 1.12, 
            rotate: 8, 
            transition:{ type: "spring", stiffness: 500, damping: 30 } }}
          whileTap={{
            scale: 1.12,
            rotate: 8,
            transition: { type: "spring", stiffness: 500, damping: 30 } // 탭 반응 쫀득하게
          }}
        >
          {/* ✨ 반짝이들 (버튼이 relative라 여기 absolute가 기준) */}
            {SPARKLES.map((s, i) => (
              <Sparkle key={i} {...s} />
          ))}
          {/* 쿠키 이미지 */}
          <img
            src={cookieImg}
            alt="행운의 쿠키"
            className="w-[35vw] max-w-[380px] min-w-[200px] h-auto"
          />
          {loading && (
            <div 
            className="absolute inset-0 z-50 grid place-items-center rounded-2xl
              bg-black/10 backdrop-blur-sm cursor-wait"
              role="status"
              aria-live="polite"
              aria-busy="true"
            >
              <figure className="flex flex-col items-center gap-3">
                <picture>
                  <img
                    src={cookieGif}
                    alt="포춘쿠키를 열고 있어요"
                    className="h-40 sm:h-52 md:h-64 w-auto max-w-full"
                    decoding="async"
                  />
                </picture>
              </figure>
            </div>
          )}
        </motion.button>

        <div className="flex flex-col items-center mt-2">
          <h1 className="my-3 text-xl sm:text-2xl md:text-2xl font-bold text-orange-600">Fortune Cookie</h1>
          <text className="mb-5 text-lg font-bold text-gray-600">🍀오늘의 운세를 확인해보세요!🍀</text>
        </div>

      </div>  
    </div>
  );
}
