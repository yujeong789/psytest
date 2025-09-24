import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();   

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
      <div className="text-4xl font-bold mb-8">심리 테스트</div>
      <div className="justify-center">
        
        {/* 첫번째 버튼 */}
        <div className="flex  items-center justify-between">
          <h1 className="m-3 text-xl sm:text-2xl md:text-3xl font-bold">행운의 쿠키</h1>
          <button
            onClick={() => navigate("/fortuneCookie")}
            className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-5000"
          >
            쿠키 깨기
          </button>
        </div>

        {/* 두번째 버튼 */}
        <div className="flex  items-center justify-between">
          <h1 className="m-3 text-xl sm:text-2xl md:text-3xl font-bold">오늘의 운세 (준비중...)</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
          >
            운세 보기
          </button>
        </div>
        
      </div>
    </div>
  );
}
