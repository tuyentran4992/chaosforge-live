import test from 'node:test';
import assert from 'node:assert/strict';
import { AST_SCHEMA } from '../shared/ast-schema.js';
import { validateAst } from '../shared/ast-validate.js';
import { duckfallback } from '../shared/cartridges.js';
import { synthesize } from '../shared/synthesize.js';

test('local synthesis is deterministic and all generated ASTs validate', () => {
  for (const prompt of ['rain ducks', 'FLOAT boss', 'shield stars', '混沌', '']) {
    assert.deepEqual(synthesize(prompt), synthesize(prompt));
    assert.equal(validateAst(synthesize(prompt)), true);
    assert.equal(synthesize(prompt).spawn_zone, 'edge_ring');
  }
  assert.equal(validateAst(duckfallback()), true);
});

test('local synthesis recognizes reverse gravity and multilingual duck prompts', () => {
  for (const prompt of ['Reverse gravity laser boss', 'Đảo ngược trọng lực + Boss mèo bắn laser',
    'gravity reversed', 'gravity is reversed', 'trọng lực bị đảo ngược', 'gravedad invertida',
    'gravity upside down duck', 'upside down gravity']) {
    const ast = synthesize(prompt);
    assert.ok(ast.gravity < 0, prompt);
    assert.equal(validateAst(ast), true);
  }
  assert.equal(synthesize('Reverse gravity laser boss').entity, 'boss');
  for (const prompt of ['vịt cao su', 'mưa vịt cao su', 'rubber duck', '橡皮鸭', 'pato de goma']) {
    assert.equal(synthesize(prompt).entity, 'duck', prompt);
  }
  assert.equal(synthesize('zero gravity ducks').gravity, 0);
  for (const prompt of ['ducks with no gravity', 'ducks without gravity', 'gravity-free ducks', 'gravity off']) {
    const ast = synthesize(prompt);
    assert.equal(ast.gravity, 0, prompt);
    assert.equal(ast.collision, 'float', prompt);
  }
  assert.ok(synthesize('rubber duck rain').gravity > 0);
  assert.equal(synthesize('duck laser').sfx, 'laser');
  assert.equal(synthesize('silent ducks').sfx, 'none');
});

test('negated gravity effects do not trigger the opposite effect', () => {
  for (const prompt of ['do not reverse gravity', "don't reverse gravity", 'never invert gravity',
    'gravity is not reversed', 'do not turn gravity upside down', "don't make gravity upside down",
    'do not use zero gravity', 'do not float', 'không đảo ngược trọng lực',
    'avoid any effect with gravity upside down', 'prevent reverse gravity', 'without upside down gravity']) {
    const ast = synthesize(prompt);
    assert.ok(ast.gravity > 0, prompt);
    assert.equal(ast.collision, 'bounce', prompt);
    assert.ok(ast.tags.includes('uncertain'), prompt);
    assert.equal(validateAst(ast), true);
  }
  assert.equal(synthesize('reverse gravity').gravity, -0.75);
  assert.equal(synthesize('do not reverse gravity but no gravity').gravity, 0);
  assert.equal(synthesize('do not reverse gravity but no gravity').collision, 'float');
  assert.ok(!synthesize('do not reverse gravity but no gravity').tags.includes('uncertain'));
});

test('AST allowlist rejects missing, extra, invalid types, ranges and tags', () => {
  const valid = duckfallback();
  const { tags, ...missing } = valid;
  const invalid = [null, [], missing, { ...valid, extra: true },
    { ...valid, entity: 'script' }, { ...valid, collision: 'execute' },
    { ...valid, spawn_zone: 'center' }, { ...valid, sfx: 'music' },
    { ...valid, gravity: Infinity }, { ...valid, gravity: -2.01 },
    { ...valid, gravity: 2.01 }, { ...valid, duration: 29 },
    { ...valid, duration: 45.5 }, { ...valid, duration: 46 },
    { ...valid, tags: [] }, { ...valid, tags: ['UPPER'] },
    { ...valid, tags: ['a'.repeat(25)] }, { ...valid, tags: Array(6).fill('a') },
  ];
  for (const ast of invalid) assert.equal(validateAst(ast), false);
  assert.equal(validateAst({ ...valid, gravity: -2, duration: 45, tags }), true);
  assert.deepEqual(Object.keys(AST_SCHEMA.properties), AST_SCHEMA.required);
});
