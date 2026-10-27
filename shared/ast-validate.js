import { AST_SCHEMA } from './ast-schema.js';

// Reject extra fields and non-plain objects before an AST reaches a renderer.
export function validateAst(ast) {
  if (ast === null || typeof ast !== 'object' || Array.isArray(ast)) return false;
  const prototype = Object.getPrototypeOf(ast);
  if (prototype !== Object.prototype && prototype !== null) return false;
  const keys = Object.keys(ast);
  if (keys.length !== AST_SCHEMA.required.length ||
      AST_SCHEMA.required.some((key) => !Object.hasOwn(ast, key))) return false;
  const schema = AST_SCHEMA.properties;
  for (const key of ['entity', 'collision', 'spawn_zone', 'sfx']) {
    if (!schema[key].enum.includes(ast[key])) return false;
  }
  if (typeof ast.gravity !== 'number' || !Number.isFinite(ast.gravity) ||
      ast.gravity < -2 || ast.gravity > 2) return false;
  if (!Number.isInteger(ast.duration) || ast.duration < 30 || ast.duration > 45) return false;
  return Array.isArray(ast.tags) && ast.tags.length >= 1 && ast.tags.length <= 5 &&
    ast.tags.every((tag) => typeof tag === 'string' && tag.length >= 1 &&
      tag.length <= 24 && /^[a-z0-9-]+$/.test(tag));
}
