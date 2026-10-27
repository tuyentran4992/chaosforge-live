import { validateAst } from '../../shared/ast-validate.js';
import { createSocket } from './socket.js';
import { MAX_STATE_DETAIL } from '../../shared/sync-contract.js';

export function createSync(onEvent, studio) {
  const channel = new BroadcastChannel(`chaosforge-${studio}`);
  const seen = new Set();
  let latest = null;
  let phase = null;
  let expiry;
  function accept(event) {
    if (!event || typeof event !== 'object') return;
    if (event.type === 'snapshot-request') {
      if (latest && latest.expires > Date.now()) channel.postMessage(latest);
      if (phase) channel.postMessage(phase);
      return;
    }
    if (event.type === 'joined') {
      if (event.latest) accept(event.latest);
      else if (latest && latest.expires > Date.now()) socket.send(latest);
      if (event.phase) accept(event.phase);
      else if (phase) socket.send(phase);
      return;
    }
    if (typeof event.id !== 'string' || seen.has(event.id)) return;
    const validState = event.type === 'state' && ['idle', 'voting', 'compiling', 'active', 'panic', 'blocked'].includes(event.state) &&
      typeof event.detail === 'string' && event.detail.length <= MAX_STATE_DETAIL;
    const validReaction = event.type === 'reaction' && ['shield', 'boost', 'emote'].includes(event.reaction);
    const validDeploy = event.type === 'deploy' && validateAst(event.ast) && Number.isFinite(event.expires) &&
      event.expires > Date.now() && event.expires <= Date.now() + event.ast.duration * 1000 + 1000;
    if (event.type !== 'panic' && event.type !== 'clear' && !validDeploy && !validState && !validReaction) return;
    seen.add(event.id);
    if (seen.size > 1000) seen.delete(seen.values().next().value);
    if (event.type === 'deploy') {
      latest = event;
      clearTimeout(expiry);
      expiry = setTimeout(() => {
        latest = null;
        if (phase && ['active', 'blocked'].includes(phase.state)) phase = null;
        onEvent({ type: 'expire' });
      }, event.expires - Date.now());
    }
    if (event.type === 'state') phase = event;
    if (event.type === 'panic' || event.type === 'clear') { latest = null; phase = null; clearTimeout(expiry); }
    onEvent(event);
  }
  channel.onmessage = (event) => accept(event.data);
  const socket = createSocket({ type: 'join', kind: 'studio', studio }, accept);
  function publish(type, value) {
    const id = crypto.randomUUID();
    if (type === 'deploy' && !validateAst(value)) return;
    const event = type === 'deploy' ? { type, id, ast: value, expires: Date.now() + value.duration * 1000 } :
      type === 'state' ? { type, id, state: value.state, detail: value.detail } :
      type === 'reaction' ? { type, id, reaction: value } : { type, id };
    accept(event);
    channel.postMessage(event);
    socket.send(event);
  }
  channel.postMessage({ type: 'snapshot-request' });
  return { publish };
}
