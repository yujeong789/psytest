// 앱의 진입점. 여기부터 시작~

import React from "react";
import ReactDom from 'react-dom/client';
import App from "./app/App.tsx";
// import "./index.css";

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>        
        <App />
    </React.StrictMode>
)   