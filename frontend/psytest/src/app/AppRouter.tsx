import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import { FortunePage, FortuneResultPage } from "@/pages";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/fortuneCookie" element={<FortunePage />} />
                <Route path="/fortuneCookieResult" element={<FortuneResultPage />} />
            </Routes>
        </BrowserRouter>
    );
}
