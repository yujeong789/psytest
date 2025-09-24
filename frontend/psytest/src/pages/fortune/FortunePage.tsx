// src/pages/fortune/FortunePage.tsx
import { useNavigate } from "react-router-dom";
import cookieImg from "@/assets/cookie.svg";
import { postFortuneCookieOpen } from "@/lib/api/fortune";
import { useState } from "react";

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

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
      <img src={cookieImg} alt="행운의 쿠키" style={{ width: "35%", height: "auto" }} />
      <h1 className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold">행운의 쿠키</h1>

      <div className="mt-5 flex gap-3">
        <button
          onClick={handleOpenCookie}
          disabled={loading}
          className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
        >
          {loading ? "열어보는 중..." : "열어보기"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
        >
          목록보기
        </button>
      </div>
    </div>
  );
}
