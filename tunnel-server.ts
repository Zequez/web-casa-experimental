import { $path } from '@/center/utils/system'
import { readFileSync } from 'node:fs'

const allowedOrigins = /^http:\/\/localhost:\d+$/

Bun.serve({
  port: 19835,
  async fetch(req) {
    const origin = req.headers.get('origin') || ''
    if (req.method === 'OPTIONS') {
      const headers = new Headers()
      if (!allowedOrigins.test(origin)) {
        headers.set('Access-Control-Allow-Origin', origin)
        headers.set('Vary', 'Origin')
      }

      headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      headers.set('Access-Control-Allow-Headers', 'Content-Type')
      return new Response(null, { status: 204, headers })
    }

    const url = new URL(req.url)

    if (req.method === 'POST') {
      const headers = new Headers({ 'Content-Type': 'application/json' })
      if (allowedOrigins.test(origin)) {
        headers.set('Access-Control-Allow-Origin', origin)
        headers.set('Vary', 'Origin')
      }

      const pathnameParts = url.pathname.slice(1).split('/')
      const fun = pathnameParts.pop()
      const pathnameFile = pathnameParts.join('/')

      const filePath = $path(pathnameFile)

      const fileRaw = readFileSync(filePath, 'utf-8')
      if (!fileRaw.startsWith('// @tunneled')) {
        return new Response(null, {
          status: 404,
          statusText: 'Requested endpoint not a tunnel',
          headers,
        })
      }

      try {
        const file = await import(filePath)
        const body = await req.json()
        console.log('RUN', `${pathnameFile} => ${fun}(${JSON.stringify(body)})`)
        const result = await file[fun as any](body)
        console.log(` => ${JSON.stringify(result)}`)
        return new Response(JSON.stringify(result), { headers })
      } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ error: String(e) }), {
          status: 400,
          statusText: `Something wrong running function ${e}`,
          headers,
        })
      }
    }

    return new Response(null, { status: 400 })
  },
})
