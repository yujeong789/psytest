import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
//   baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getFortuneCookie = async () => {
  const response = await api.get("/fortuneCookie");
  console.log("운세 쿠키 API 응답:", response.data.data.fortune);
  return response.data.data.fortune;
};
