import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/shared/styles/_variables.scss" as *;
        @use "@/shared/styles/_mixins.scss" as *;
        @use "@/shared/styles/_media.scss" as *;
        @use "@/shared/styles/_utils.scss" as *;
        `,
      }
    }
  }
})
