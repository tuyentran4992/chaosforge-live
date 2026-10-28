export const AST_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    entity: { type: 'string', enum: ['duck', 'ball', 'star', 'boss', 'doge', 'popcat'] },
    gravity: { type: 'number', minimum: -2, maximum: 2 },
    collision: { type: 'string', enum: ['bounce', 'float', 'shield'] },
    spawn_zone: { type: 'string', enum: ['edge_ring'] },
    sfx: { type: 'string', enum: ['quack', 'pop', 'laser', 'bonk', 'bruh', 'boom', 'none'] },
    duration: { type: 'integer', minimum: 30, maximum: 45 },
    tags: {
      type: 'array', minItems: 1, maxItems: 5,
      items: { type: 'string', minLength: 1, maxLength: 24, pattern: '^[a-z0-9-]+$' },
    },
  },
  required: ['entity', 'gravity', 'collision', 'spawn_zone', 'sfx', 'duration', 'tags'],
};
