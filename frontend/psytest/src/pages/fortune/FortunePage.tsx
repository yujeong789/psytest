// src/pages/fortune/FortunePage.tsx
import { useNavigate } from "react-router-dom";
import cookieImg from "@/assets/img/cookie.svg";
import brokenCookieUrl from "@/assets/img/broken_cookie.svg?url";
import { postFortuneCookieOpen } from "@/lib/api/fortune";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Sparkle } from "@/conmponents/fortune/Sparkle";
import { SparklesOverlay } from "@/conmponents/fortune/SparklesOverlay";


export default function FortunePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 사전 로드 (broken_cookie는 미리 로드하면 안됨)
    const img = new Image();
    img.src = brokenCookieUrl;
  }, []);

  const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
    
  const handleOpenCookie = async () => {
    try {
      setLoading(true);
      // const data = await postFortuneCookieOpen(); // API 호출

      const MIN_WAIT = 60; // 1.2초 대기
      const [data] = await Promise.all([
    postFortuneCookieOpen(), // 실제 API
    wait(MIN_WAIT),         // 최소 1.2초 딜레이
  ]);

      // 결과 페이지로 데이터 넘기기 (state 사용)
      console.log("쿠키 데이터:", data);
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
    { x: 90, y: -5, size: 12, delay: 0.3 },
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
            fetchPriority="high"
            decoding="async"
            className="w-[35vw] max-w-[380px] min-w-[200px] h-auto"
          />
          {loading && (
            <div 
              className="absolute inset-0 z-50 grid place-items-center rounded-2xl
                backdrop-blur-sm cursor-wait"
              role="status"
              aria-live="polite"
              aria-busy="true"
            >
              <SparklesOverlay />
            </div>
          )}
        </motion.button>

        <div className="flex flex-col items-center mt-2">
          <h1 className="my-3 text-xl sm:text-2xl md:text-2xl font-bold text-orange-600">Fortune Cookie</h1>
          <p className="mb-5 text-sm font-bold text-gray-600">🍀 오늘의 운세를 확인해보세요! 🍀</p>
        </div>

      </div>  
    </div>
  );
}
