export const BLOCKED_MESSAGE = 'PROMPT BLOCKED BY TOS GUARD — DEPLOYING SAFE RUBBER DUCK FALLBACK';

export function duckfallback() {
  return {
    entity: 'duck', gravity: 0.4, collision: 'bounce', spawn_zone: 'edge_ring',
    sfx: 'quack', duration: 30, tags: ['rescue', 'rubber-ducks'],
  };
}
