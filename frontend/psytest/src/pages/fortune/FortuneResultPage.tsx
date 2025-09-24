// src/pages/fortune/FortuneResultPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import brokenCookieImg from "@/assets/broken_cookie.svg";
import { postFortuneCookieOpen, getFortuneCookieSharedResult, type FortunePayload } from "@/lib/api/fortune";

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

  // 조용한 복사 + 폴백
const copySilently = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text); // HTTPS + 사용자 클릭 이벤트 내에서만!
    // 아무것도 안 띄움 (원하면 아래에 토스트 상태만 켜기)
  } catch {
    // 폴백: iOS Safari 등에서 clipboard API가 실패하면
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } finally {
      document.body.removeChild(ta);
    }
  }
};

const [copied, setCopied] = useState(false);

const onCopyLink = async () => {
  if (!data) return;
  const url = new URL(data.shareUrl, window.location.origin).toString();
  await copySilently(url);
  setCopied(true);
  setTimeout(() => setCopied(false), 1000);
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
        {/* 공유링크 타고온 경우에는 공유하기 버튼 삭제 */}
        {!isSharedView && (
          <>
        <button onClick={onCopyLink} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          공유하기
        </button>

        {copied && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-md bg-black/80 text-white text-sm px-3 py-2">
            클립보드에 복사했어요.
          </div>
        )}
        </>
        )}
        <button onClick={() => navigate("/fortuneCookie")} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          {isSharedView ? "나도열기" : "다시하기"}
        </button>
        <button onClick={() => navigate("/")} className="text-sm px-3 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500">
          목록보기
        </button>
      </div>
    </div>
  );
}
