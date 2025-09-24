// src/pages/fortune/FortuneResultPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import brokenCookieImg from "@/assets/broken_cookie.svg";
import { postFortuneCookieOpen, getFortuneCookieSharedResult, type FortunePayload } from "@/lib/api/fortune";
import { motion } from "framer-motion";

export default function FortuneResultPage() {
  const { id } = useParams(); // 공유 진입이면 값 있음
  const isSharedView = !!id; // 공유링크로 진입 여부 체크
  const navigate = useNavigate();

  const [data, setData] = useState<FortunePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = isSharedView
          ? await getFortuneCookieSharedResult(id) // 공유 링크로 복원
          : await postFortuneCookieOpen();         // 처음 뽑기 (URL 그대로)
        setData(res);
      } catch (e: any) {
        console.error("쿠키 불러오기 실패:", e);
        setError(e?.message || "운세를 가져올 수 없습니다. 다시 시도해주세요!");
      } finally {
        setLoading(false);
      }
    })();
  }, [isSharedView, id]);

  const onShare = async () => {
    if (!data) return;
    const absolute = new URL(data.shareUrl, window.location.origin).toString();
    try {
      navigator.clipboard.writeText(absolute);
      // alert("링크가 클립보드에 복사되었습니다.");
      // 성공 토스트 등 추가 가능
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
        <p>{error}</p>
        <button
          onClick={() => navigate("/fortuneCookieResult")}
          className="mt-4 px-6 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 여기부터는 data가 존재
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center">
      <motion.div
      // style={{ width: "40%", height: "auto" }}
      // 살짝 둥둥 떠다니기 + 기울기
        animate={{y: [0, -5, 0], rotate: [0, 1, 0, -1, 0]}}
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
        <img 
          src={brokenCookieImg} 
          alt="행운의 쿠키" 
          className="w-[35vw] max-w-[380px] min-w-[200px] h-auto"
        ></img>
      </motion.div>
      <div>
        <div
        >
          {/* 운세 내용 */}
          <div className="flex flex-col items-center mb-8">
            <text className="my-2 text-xl font-bold text-gray-600">🍀오늘의 운세🍀</text>
            <text className="my-2 text-lg font-bold text-gray-600">{data!.fortune}</text>
          </div>
          <div className="flex justify-center mt-4 border-t pt-4">
            {/* 행운의 숫자 */}
            <div className="px-8 border-r">
              <h1 className="my-2 text-lg font-bold text-gray-600">행운의 숫자</h1>
              <h1 className="my-2 text-lg font-bold text-gray-600">34</h1>
            </div>
            {/* 행운의 색깔 */}
            <div className="px-8">
              <h1 className="my-2 text-lg font-bold text-gray-600">행운의 색깔</h1>
              <h1 className="my-2 text-lg font-bold text-gray-600">파랑</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 flex gap-3">
        <button onClick={() => navigate("/fortuneCookie")} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          {isSharedView ? "나도열기" : "다시하기"}
        </button>
        {/* 공유링크 타고온 경우에는 공유하기 버튼 삭제 */}
        {!isSharedView && (
        <button onClick={onShare} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          공유하기
        </button>
        )}
        {/* <button onClick={() => navigate("/")} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          목록보기
        </button> */}
      </div>
    </div>
  );
}
