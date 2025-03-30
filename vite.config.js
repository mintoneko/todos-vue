import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: process.env.VITE_BASE_PUBLIC || '/todos-vue/', // 新增base配置
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
// 调试查看base路径的影响
/*
# 先构建时指定base路径（与线上保持一致）
VITE_BASE_PUBLIC='/todos-vue/' npm run build

# 然后启动预览服务器
npm run preview
*/
// 可以看下build中的资源路径