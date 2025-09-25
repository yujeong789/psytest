import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import { fileURLToPath, URL } from  'node:url';

export default defineConfig({
  // 빌드 설정
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 개발 서버 프록시 설정
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring Boot 백엔드
        changeOrigin: true,
      },
    },
  },
})
