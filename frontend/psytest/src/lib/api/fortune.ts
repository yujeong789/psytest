import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
//   baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

type FortuneResponse = { 
  fortuneCookieUuid: string; 
  fortune: string; 
    luck: number;
};

export type FortunePayload = { 
  id: string; 
  fortune: string; 
  luck: number;
  shareUrl: string;
};

// 처음 뽑기: 서버는 { fortuneCookieUuid, fortune }만 줌 → 프론트에서 매핑
export const postFortuneCookieOpen = async (): Promise<FortunePayload> => {
  const res = await api.post("/fortuneCookie");
  const d: FortuneResponse = res.data?.data ?? res.data;
  return {
    id: d.fortuneCookieUuid,
    fortune: d.fortune,
    luck: d.luck,
    // 공유 링크 규칙에 맞춰서 한 곳에서 생성 (여기서는 /fortuneCookieResult/:id 사용)
    shareUrl: `/fortuneCookieResult/${encodeURIComponent(d.fortuneCookieUuid)}`,
  };
};

// 공유 재조회: 응답이 동일 포맷이더라도 프론트에서 같은 뷰모델로 매핑
export const getFortuneCookieSharedResult = async (shareId: string): Promise<FortunePayload> => {
  const res = await api.get(`/fortuneCookie/${encodeURIComponent(shareId)}`);
  const d: FortuneResponse = res.data?.data ?? res.data;
  return {
    id: d.fortuneCookieUuid,
    fortune: d.fortune,
    luck: d.luck,
    shareUrl: `/fortuneCookieResult/${encodeURIComponent(d.fortuneCookieUuid)}`,
  };
};