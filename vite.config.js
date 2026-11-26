import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, loadEnv } from 'vite'
import instagramHandler from './api/instagram.js'

// Instagram 로컬 API 연결
function instagramApiPlugin() {
  return {
    name: 'instagram-api',

    configureServer(server) {
      server.middlewares.use('/api/instagram', async (req, res) => {
        // Vercel 응답 방식 지원
        res.status = (statusCode) => {
          res.statusCode = statusCode
          return res
        }

        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(data))
        }

        await instagramHandler(req, res)
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // .env 환경변수 불러오기
  const env = loadEnv(mode, process.cwd(), '')

  process.env.RAPIDAPI_KEY = env.RAPIDAPI_KEY
  process.env.RAPIDAPI_HOST = env.RAPIDAPI_HOST
  process.env.INSTAGRAM_USERNAME = env.INSTAGRAM_USERNAME

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      instagramApiPlugin(),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['./src/scss'],
          additionalData:
            '@use "variables" as *;\n@use "mixins" as *;',
        },
      },
    },
  }
})