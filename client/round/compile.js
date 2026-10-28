import { synthesize } from '../../shared/synthesize.js';
import { isUnsafePrompt } from '../../shared/safety.js';
import { duckfallback } from '../../shared/cartridges.js';

let accessToken = '';

export async function requestCompile(prompt) {
  async function send() {
    const headers = { 'Content-Type': 'application/json' };
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    return fetch('/api/compile', { method: 'POST', headers, body: JSON.stringify({ prompt }) });
  }
  try {
    let response = await send();
    if (response.status === 401) {
      accessToken = window.prompt('Enter the compiler access token:') || '';
      if (!accessToken) throw new Error('Authorization required');
      response = await send();
    }
    if (response.ok) return await response.json();
    if (response.status === 429) throw new Error('Compiler rate limit reached');
  } catch (err) {
    if (err.message === 'Compiler rate limit reached' || err.message === 'Authorization required') throw err;
  }
  if (isUnsafePrompt(prompt)) return { ast: duckfallback(), source: 'duckfallback', blocked: true, uncertain: false };
  const ast = synthesize(prompt);
  return { ast, source: 'local', blocked: false, uncertain: ast.tags.includes('uncertain') };
}
