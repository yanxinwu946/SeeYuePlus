import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages 项目站点：https://yanxinwu946.github.io/SeeYuePlus/
// 换自定义域名时把这里改成 '/'。
//
// 只有 `npm run dev` 走根路径：build 与 preview 都必须带上子路径，
// 否则 preview 会按根路径去找 assets，全部落到 SPA fallback 上。
const BASE = '/SeeYuePlus/'

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? BASE : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 单页宣传站，体积优先于并行请求
    cssCodeSplit: false,
    chunkSizeWarningLimit: 900,
  },
}))
