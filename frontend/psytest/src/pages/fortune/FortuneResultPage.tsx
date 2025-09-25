// src/pages/fortune/FortuneResultPage.tsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { postFortuneCookieOpen, getFortuneCookieSharedResult, type FortunePayload } from "@/lib/api/fortune";
import { motion } from "framer-motion";
import brokenCookieImg from "@/assets/img/broken_cookie.svg";
import CopyIcon from "@/assets/icon/copy.svg?react";
import RefreshIcon from "@/assets/icon/refresh.svg?react";

export default function FortuneResultPage() {
  const { id } = useParams(); // 공유 진입이면 값 있음
  const isSharedView = !!id; // 공유링크로 진입 여부 체크
  const navigate = useNavigate();
  const location = useLocation();

  const passed = (location.state as { fortune?: FortunePayload } | undefined)?.fortune;

  const [data, setData] = useState<FortunePayload | null>(passed ?? null);
  const [loading, setLoading] = useState(!passed);
  const [error, setError] = useState<string | null>(null);

  const fetchedOnce = useRef(false); // 중복 호출 방지용

  useEffect(() => {
    // 1) 공유 링크면 항상 서버에서 복원
    // 2) 공유가 아니면, state 없을 때만 서버 호출
    if (fetchedOnce.current) return;
    if (!isSharedView && passed) return;

    fetchedOnce.current = true;
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
        className="-mt-10 mb-6"
      // style={{ width: "40%", height: "auto" }}
      // 살짝 둥둥 떠다니기 + 기울기
        animate={{y: [0, -5, 0], rotate: [0, 1, 0, -1, 0]}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ 
          scale: 1, 
          rotate: 8, 
          transition:{ type: "spring", stiffness: 500, damping: 30 } }}
        whileTap={{
          scale: 1,
          rotate: 4,
          transition: { type: "spring", stiffness: 500, damping: 30 } // 탭 반응 쫀득하게
        }}
      >
        <img 
          src={brokenCookieImg} 
          alt="행운의 쿠키" 
          className="w-[8vw] max-w-[380px] min-w-[120px] h-auto"
        ></img>
      </motion.div>
      <div>
        <div
        >
          {/* 운세 내용 */}
          <div className="flex flex-col items-center mb-8">
            <p className="my-2 text-md font-bold text-gray-600">🍀 오늘의 운세 🍀</p>
            <p className="my-2 text-md text-gray-600">{data!.fortune}</p>
          </div>
          <div className="flex justify-center mt-4 border-t-2 border-white border-opacity-50 pt-4">
            {/* 행운 지수 */}
            <div className="px-8 border-r-2 border-white border-opacity-50 ">
              <h1 className="my-2 text-sm font-bold text-gray-600">행운 지수</h1>
              <div className="flex justify-center items-center gap-1">
                <h1 className="grid place-items-center w-15 h-12 rounded-full text-xl"
                >
                  {data!.luck}
                </h1>
              </div>
            </div>
            {/* 행운의 색깔 */}
            <div className="px-8">
              <h1 className="my-2 text-sm font-bold text-gray-600">오늘의 키워드</h1>
              <div className="flex justify-center items-center gap-1">
                <h1 className="grid place-items-center w-15 h-12 rounded-full text-md">😊휴식</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-center gap-3">
        {/* 다시하기 버튼 */}
        <button
          onClick={() => navigate("/fortuneCookie")}
          className="group inline-flex items-center gap-2 px-3 py-3 rounded-3xl bg-white hover:bg-orange-400 text-white"
        >
          <RefreshIcon 
            className="
              w-5 h-5
              [&_*]:stroke-orange-500 
              [&_*]:[stroke-width:3px]
              group-hover:[&_*]:stroke-white
              transition-colors
            " 
            aria-hidden 
          />
        </button>

        {/* 링크복사 버튼 */}
        {!isSharedView && (
        <button 
          onClick={onShare} 
          className="group inline-flex items-center gap-2 px-3 py-3 rounded-3xl bg-white hover:bg-orange-400 text-white"
        >
          <CopyIcon 
            className="
              w-6 h-6
              [&_*]:stroke-orange-500 
              [&_*]:[stroke-width:2.5px]
              group-hover:[&_*]:stroke-white
              transition-colors
            " 
            aria-hidden 
          />
        </button>
        )}
      </div>
    </div>
  );
}
