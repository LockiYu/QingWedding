import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
declare const process: { env: Record<string, string | undefined> }

// 自定义域名可设置 VITE_BASE_PATH=/。
export default defineConfig({ plugins: [vue()], base: process.env.VITE_BASE_PATH || '/QingWedding/' })
