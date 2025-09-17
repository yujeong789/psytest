import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // 빌드 설정
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
