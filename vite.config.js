import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function telemetryPlugin() {
  return {
    name: 'telemetry-logger',
    configureServer(server) {
      server.middlewares.use('/api/telemetry', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}')
              const now = new Date()
              const timestamp = now.toISOString().replace('T', ' ').slice(0, 19)
              const logFile = path.resolve(__dirname, 'telemetry_logs.txt')

              let logLine = ''
              if (data.type === 'VISIT') {
                logLine = `[${timestamp}] VISIT #${data.visitCount || 1} | Path: ${data.path || '/'} | Referrer: ${data.referrer || 'Direct'} | Screen: ${data.screen || 'Unknown'} | Mode: ${data.mode || 'clean'}\n`
              } else if (data.type === 'ULTRA_ENTER') {
                logLine = `[${timestamp}] ULTRA_MODE_UNLOCKED | Trigger: ${data.trigger || 'button'} | Total Visits: ${data.visitCount || 1}\n`
              } else if (data.type === 'FEEDBACK') {
                logLine = `[${timestamp}] FEEDBACK_SUBMITTED | Rating: ${data.rating} | Mode: Ultra -> Normal | Total Visits: ${data.visitCount || 1}\n`
              } else {
                logLine = `[${timestamp}] EVENT: ${data.type || 'UNKNOWN'} | ${JSON.stringify(data)}\n`
              }

              fs.appendFileSync(logFile, logLine, 'utf8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: err.message }))
            }
          })
        } else {
          res.statusCode = 404
          res.end()
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), telemetryPlugin()],
  server: {
    port: 5173,
    host: true
  }
})

