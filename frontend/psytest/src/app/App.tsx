// 앱의 뼈대 (Lyout, Router 등)
// 여기부터 라우터를 붙임
// AppRouter를 감싸는 역할

import { AppRouter } from "./AppRouter";

function App() {
  return (
    <AppRouter />
  );
}

export default App;
