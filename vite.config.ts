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
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
          @use "sass:map";
          @use "sass:list";
          @use "sass:meta";
          @use "sass:math";
          @use "sass:selector";
          @use "sass:string";
          @use "sass:color";
          @use "@/styles/utilities/" as *;
          @use "@/styles/responsive/" as *;
          @use "@/styles/designs/" as *;
          @use "@/styles/responsive/config" as responsive;
          @use "@/styles/colors/" as colors;
          @use "@/styles/fonts/" as fonts;
        `,
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        '02_effect-ripple': 'workspace/02_effect-ripple/index.html'
      },
    },
  },
})
