// src/pages/fortune/FortuneResultPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import brokenCookieImg from "@/assets/broken_cookie.svg";
import { postFortuneCookieOpen, getFortuneCookieSharedResult, type FortunePayload } from "@/lib/api/fortune";

export default function FortuneResultPage() {
  const { id } = useParams(); // 공유 진입이면 값 있음
  const navigate = useNavigate();

  const [data, setData] = useState<FortunePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = id
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
  }, [id]);

  const onShare = async () => {
    if (!data) return;
    const absolute = new URL(data.shareUrl, window.location.origin).toString();
    try {
      if (navigator.share) await navigator.share({ url: absolute });
      else await navigator.clipboard.writeText(absolute);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e6] text-center px-4">
      <img src={brokenCookieImg} alt="행운의 쿠키" style={{ width: "40%", height: "auto" }} />
      <h1 className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold">{data!.fortune}</h1>

      <div className="mt-5 flex gap-3">
        <button onClick={onShare} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          공유하기
        </button>
        <button onClick={() => navigate("/fortuneCookie")} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          다시하기
        </button>
        <button onClick={() => navigate("/")} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          목록보기
        </button>
      </div>
    </div>
  );
}
