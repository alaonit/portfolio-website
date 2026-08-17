import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'node:process'

export default defineConfig({
  base: env.GITHUB_ACTIONS ? '/portfolio-website/' : '/',
  plugins: [react()],
})
