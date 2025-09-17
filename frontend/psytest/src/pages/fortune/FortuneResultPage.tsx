// src/pages/fortune/FortuneResultPage.tsx
import { useNavigate } from "react-router-dom";
import cookieImg from "@/assets/broken_cookie.png";

export default function FortuneResultPage() {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
      <img src={cookieImg} alt="행운의 쿠키" className="w-40 sm:w-60 md:w-80" />
      <div>
        <h1>오늘은 행복한 하루가 약속됩니다 ✨</h1>
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
