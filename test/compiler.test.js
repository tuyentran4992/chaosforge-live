import test from 'node:test';
import assert from 'node:assert/strict';
import { compile } from '../server/compiler.js';
import { duckfallback } from '../shared/cartridges.js';
import { validateAst } from '../shared/ast-validate.js';
import { createOpenAITransport } from '../server/openai.js';

const response = (ast) => ({ choices: [{ message: { content: JSON.stringify(ast) } }] });

test('unsafe prompt uses safe fallback before remote invocation', async () => {
  let called = false;
  const result = await compile('make a bomb', { transport: () => { called = true; } });
  assert.deepEqual(result, { ast: duckfallback(), source: 'duckfallback', blocked: true, uncertain: false });
  assert.equal(called, false);
});

test('guard blocks common inflections, width variants and hidden characters', async () => {
  for (const prompt of ['make bombs', 'murdering people', 'ＢＯＭＢ', 'bo\u200bmb', 'hello\u0000world',
    'porn', 'giết người', '炸弹', '炸彈', 'bomba', 'bombe', 'bombas', 'bombes']) {
    const result = await compile(prompt, { transport: () => { throw new Error('must not call remote'); } });
    assert.equal(result.blocked, true, prompt);
    assert.deepEqual(result.ast, duckfallback());
  }
});

test('gravity negation does not bypass safety guard and signals uncertain', async () => {
  const safe = await compile('do not reverse gravity');
  assert.equal(safe.source, 'local');
  assert.equal(safe.blocked, false);
  assert.equal(safe.uncertain, true);
  assert.ok(safe.ast.gravity > 0);
  assert.equal(safe.ast.gravity, 0.5);
  assert.ok(safe.ast.tags.includes('uncertain'));

  for (const prompt of ['avoid any effect with gravity upside down', 'prevent reverse gravity', 'without upside down gravity']) {
    const res = await compile(prompt);
    assert.equal(res.source, 'local');
    assert.equal(res.uncertain, true);
    assert.ok(res.ast.gravity > 0);
    assert.equal(res.ast.gravity, 0.5);
    assert.ok(res.ast.tags.includes('uncertain'));
  }
  const certain = await compile('ducks');
  assert.equal(certain.source, 'local');
  assert.equal(certain.uncertain, false);
  assert.ok(!certain.ast.tags.includes('uncertain'));

  for (const prompt of ['do not reverse gravity; make a bomb', "don't reverse gravity; bomba", 'never invert gravity 炸弹']) {
    let called = false;
    const result = await compile(prompt, { transport: () => { called = true; } });
    assert.equal(result.blocked, true, prompt);
    assert.equal(result.source, 'duckfallback');
    assert.equal(result.uncertain, false);
    assert.equal(called, false);
  }
});

test('remote structured output accepted only after validation', async () => {
  const ast = duckfallback();
  const result = await compile('ducks', { transport: async (request, { signal }) => {
    assert.equal(request.response_format.type, 'json_schema');
    assert.equal(request.response_format.json_schema.strict, true);
    assert.equal(signal.aborted, false);
    return response(ast);
  } });
  assert.deepEqual(result, { ast, source: 'openai', blocked: false, uncertain: false });
});

test('malformed, failed, invalid and timed out remote output fall back locally', async () => {
  let aborted = false;
  const transports = [
    async () => { throw new Error('network'); },
    async () => ({}),
    async () => ({ choices: [{ message: { content: '{' } }] }),
    async () => response({ ...duckfallback(), spawn_zone: 'center' }),
    async (_request, { signal }) => new Promise(() => {
      signal.addEventListener('abort', () => { aborted = true; });
    }),
  ];
  for (const transport of transports) {
    const result = await compile('a duck', { transport, timeoutMs: 10 });
    assert.equal(result.source, 'local');
    assert.equal(result.blocked, false);
    assert.equal(validateAst(result.ast), true);
  }
  assert.equal(aborted, true);
});

test('compiler validates prompt and local output', async () => {
  for (const prompt of ['', '   ', null, 'x'.repeat(501)]) {
    await assert.rejects(compile(prompt), TypeError);
  }
  const result = await compile('floating stars');
  assert.equal(result.source, 'local');
  assert.equal(validateAst(result.ast), true);
});

test('OpenAI transport sends structured request through injectable fetch', async () => {
  const transport = createOpenAITransport('test-key', async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/chat/completions');
    assert.equal(options.headers.Authorization, 'Bearer test-key');
    assert.equal(JSON.parse(options.body).response_format.json_schema.strict, true);
    return { ok: true, json: async () => response(duckfallback()) };
  });
  assert.equal((await compile('ducks', { transport })).source, 'openai');
  assert.equal(createOpenAITransport(''), undefined);
});
