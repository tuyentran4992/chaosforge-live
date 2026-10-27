import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { compile } from './compiler.js';
import { createCompileAccess } from './access.js';

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };
const MAX_BODY = 4096;

export function createHandler(root, transport, accessToken) {
  const base = resolve(root);
  const authorize = createCompileAccess({ token: accessToken, paid: Boolean(transport) });
  return async function handle(req, res) {
    const send = (code, value) => {
      res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(value));
    };
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname === '/api/compile') {
        if (req.method !== 'POST') return send(405, { error: 'Method not allowed' });
        const access = authorize(req);
        if (access.status !== 200) return send(access.status, { error: access.status === 401 ? 'Authorization required' : 'Rate limit exceeded' });
        try {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
            if (Buffer.byteLength(body) > MAX_BODY) return send(413, { error: 'Request too large' });
          }
          let input;
          try { input = JSON.parse(body); } catch { return send(400, { error: 'Invalid JSON' }); }
          try { return send(200, await compile(input?.prompt, { transport })); }
          catch { return send(400, { error: 'Invalid prompt' }); }
        } finally { access.release(); }
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') return send(405, { error: 'Method not allowed' });
      const pathname = decodeURIComponent(url.pathname);
      const target = resolve(base, `.${pathname === '/' ? '/index.html' : pathname}`);
      const relative = target.slice(base.length + 1).replaceAll('\\', '/');
      if (!target.startsWith(base + sep) ||
          !(/^(index|overlay|design-system)\.html$/.test(relative) || /^(client|shared)\//.test(relative))) {
        return send(404, { error: 'Not found' });
      }
      const data = await readFile(target);
      res.writeHead(200, { 'Content-Type': MIME[extname(target)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff' });
      return res.end(req.method === 'HEAD' ? undefined : data);
    } catch {
      return send(404, { error: 'Not found' });
    }
  };
}
