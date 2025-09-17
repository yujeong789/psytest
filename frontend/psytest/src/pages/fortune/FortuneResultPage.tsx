// src/pages/fortune/FortuneResultPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import brokenCookieImg from "@/assets/broken_cookie.png";

export default function FortuneResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fortune = location.state?.fortune || "운세를 불러올 수 없습니다 😢";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
      <img src={brokenCookieImg} alt="행운의 쿠키" className="w-40 sm:w-60 md:w-80" />
      <div>
        <h1>{fortune}</h1>
      </div>

      <button
        onClick={() => navigate("/fortuneCookie")}
        className="mt-10 px-6 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
      >
        다시하기
      </button>
      <button
        onClick={() => navigate("/")}
        className="mt-10 px-6 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
      >
        목록보기
      </button>
    </div>
  );
}
