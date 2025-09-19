// src/pages/fortune/FortuneResultPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import brokenCookieImg from "@/assets/broken_cookie.svg";

export default function FortuneResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fortune = location.state?.fortune || "운세를 불러올 수 없습니다 😢";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
      <img src={brokenCookieImg} alt="행운의 쿠키" style={{ width: "40%", height: "auto" }} />
      <div>
        <h1 className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold">{fortune}</h1>
      </div>

      <button
        onClick={() => navigate("/fortuneCookie")}
        className="mt-5 px-6 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
      >
        다시하기
      </button>
      <button
        onClick={() => navigate("/")}
        className="mt-5 px-6 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
      >
        목록보기
      </button>
    </div>
  );
}
