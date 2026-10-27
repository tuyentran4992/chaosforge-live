import { validateAst } from '../shared/ast-validate.js';
import { duckfallback } from '../shared/cartridges.js';
import { isUnsafePrompt } from '../shared/safety.js';
import { synthesize } from '../shared/synthesize.js';
import { requestRemoteAst } from './openai.js';

export const MAX_PROMPT_LENGTH = 500;
export const REMOTE_TIMEOUT_MS = 2200;

// Invalid input is rejected; callers may display an input validation error.
export async function compile(prompt, { transport, timeoutMs = REMOTE_TIMEOUT_MS } = {}) {
  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > MAX_PROMPT_LENGTH) {
    throw new TypeError('Prompt must contain 1–500 characters');
  }
  if (isUnsafePrompt(prompt)) return { ast: duckfallback(), source: 'duckfallback', blocked: true, uncertain: false };
  const local = () => {
    const ast = synthesize(prompt);
    return { ast, source: 'local', blocked: false, uncertain: ast.tags.includes('uncertain') };
  };
  if (typeof transport !== 'function') return local();

  const controller = new AbortController();
  let timer;
  try {
    const deadline = Number.isFinite(timeoutMs) ? Math.max(1, Math.min(timeoutMs, REMOTE_TIMEOUT_MS)) : REMOTE_TIMEOUT_MS;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error('Remote compiler deadline exceeded'));
      }, deadline);
    });
    const ast = await Promise.race([requestRemoteAst(prompt, transport, controller.signal), timeout]);
    return validateAst(ast) ? { ast, source: 'openai', blocked: false, uncertain: false } : local();
  } catch {
    return local();
  } finally {
    clearTimeout(timer);
  }
}
