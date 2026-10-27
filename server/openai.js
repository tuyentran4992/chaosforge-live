import { AST_SCHEMA } from '../shared/ast-schema.js';

// Server-only adapter. The key remains in the closure and is never returned.
export function createOpenAITransport(key, fetchImpl = fetch) {
  if (!key) return undefined;
  return async (request, { signal }) => {
    const response = await fetchImpl('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(request),
      signal,
    });
    if (!response.ok) throw new Error('Remote compiler unavailable');
    return response.json();
  };
}

// Transport owns authentication and network access; this module never handles a key.
export async function requestRemoteAst(prompt, transport, signal) {
  const request = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Create a safe arcade effect. Return only the requested AST.' },
      { role: 'user', content: prompt },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: { name: 'chaos_ast', strict: true, schema: AST_SCHEMA },
    },
  };
  const response = await transport(request, { signal });
  const content = response?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new Error('Missing structured output');
  return JSON.parse(content);
}
