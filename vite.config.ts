import { defineConfig } from 'vite'
import { glslify } from 'vite-plugin-glslify'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [glslify()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'public': path.resolve(__dirname, 'public'),
    },
  },
})
