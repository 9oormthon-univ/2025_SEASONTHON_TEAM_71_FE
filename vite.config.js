import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //server: {
    //proxy: {
      // 프론트에서 /api 로 시작하는 요청은 백엔드로 프록시
      // '/api': {
      //   target: 'http://13.125.205.40:8080',
      //   changeOrigin: true,
        // 필요시 경로 재작성 (여기선 그대로 사용)
        // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
