import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();   

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
      <div className="text-lg font-bold">🥠🥠🥠🥠🥠🥠🥠</div>
      <div className="text-lg font-bold">🥠🥠🥠🥠🥠🥠🥠</div>
      <div className="text-lg font-bold ">🥠🥠포춘쿠키🥠🥠</div>
      <div className="text-lg font-bold">🥠🥠🥠🥠🥠🥠🥠</div>
      <div className="text-lg font-bold mb-4">🥠🥠🥠🥠🥠🥠🥠</div>
      <div className="justify-center">
        
        {/* 첫번째 버튼 */}
        <div className="flex  items-center justify-between">
          <button
            onClick={() => navigate("/fortuneCookie")}
            className="text-sm p-2 bg-orange-400 rounded-lg shadow text-orange-500 bg-white hover:bg-orange-400 hover:text-white"
          >
            {/* group inline-flex items-center gap-2 px-3 py-3 rounded-3xl bg-white hover:bg-orange-400 text-white */}
            🔨 깨러가기 🔨
          </button>
        </div>

        {/* 두번째 버튼 */}
        {/* <div className="flex  items-center justify-between">
          <h1 className="m-3 text-xl sm:text-2xl md:text-3xl font-bold">오늘의 운세 (준비중...)</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500"
          >
            운세 보기
          </button>
        </div> */}
        
      </div>
    </div>
  );
}
