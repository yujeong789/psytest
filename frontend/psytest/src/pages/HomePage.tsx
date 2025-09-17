import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();   

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
      <h1 className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold">행운의 쿠키</h1>

      <button
        onClick={() => navigate("/fortuneCookie")}
        className="mt-10 px-6 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
      >
        시작하기
      </button>
    </div>
  );
}
