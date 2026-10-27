import { validateAst } from '../shared/ast-validate.js';
import { acceptWebSocket } from './ws.js';
import { MAX_STATE_DETAIL } from '../shared/sync-contract.js';

export function attachRooms(server) {
  const rooms = new Map();
  const membership = new Map();
  function leave(peer) {
    const key = membership.get(peer);
    if (!key) return;
    const room = rooms.get(key);
    room?.peers.delete(peer);
    if (room?.peers.size === 0) rooms.delete(key);
    membership.delete(peer);
  }
  function join(peer, data) {
    const validStudio = data.kind === 'studio' && typeof data.studio === 'string' &&
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(data.studio);
    const validRaid = data.kind === 'raid' && typeof data.room === 'string' && /^[A-Z0-9]{4}$/.test(data.room);
    if (!validStudio && !validRaid) return;
    leave(peer);
    const key = validStudio ? `studio:${data.studio}` : `raid:${data.room}`;
    if (!rooms.has(key)) rooms.set(key, { peers: new Set(), latest: null, phase: null });
    const room = rooms.get(key);
    room.peers.add(peer);
    membership.set(peer, key);
    if (room.latest?.expires <= Date.now()) {
      room.latest = null;
      if (room.phase && ['active', 'blocked'].includes(room.phase.state)) room.phase = null;
    }
    peer.send({ type: 'joined', kind: data.kind, room: data.room, latest: room.latest, phase: room.phase });
  }
  function message(peer, data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;
    if (data.type === 'join') return join(peer, data);
    const key = membership.get(peer);
    const room = rooms.get(key);
    if (!room || typeof data.id !== 'string' || !/^[a-zA-Z0-9-]{1,80}$/.test(data.id)) return;
    if (key.startsWith('raid:')) {
      if (data.type !== 'raid-send' || !validateAst(data.ast)) return;
      let delivered = 0;
      for (const other of room.peers) {
        if (other !== peer && other.send({ type: 'raid-receive', id: data.id, ast: data.ast })) delivered += 1;
      }
      peer.send({ type: 'raid-result', id: data.id, delivered });
      return;
    }
    const states = ['idle', 'voting', 'compiling', 'active', 'panic', 'blocked'];
    const validState = data.type === 'state' && states.includes(data.state) &&
      typeof data.detail === 'string' && data.detail.length <= MAX_STATE_DETAIL;
    const validReaction = data.type === 'reaction' && ['shield', 'boost', 'emote'].includes(data.reaction);
    if (data.type !== 'panic' && data.type !== 'clear' && !(data.type === 'deploy' && validateAst(data.ast)) && !validState && !validReaction) return;
    const maxExpiry = data.type === 'deploy' ? Date.now() + data.ast.duration * 1000 : 0;
    if (data.type === 'deploy' && Number.isFinite(data.expires) && data.expires <= Date.now()) return;
    const event = data.type === 'deploy' ? { type: 'deploy', id: data.id, ast: data.ast,
      expires: Number.isFinite(data.expires) ? Math.min(data.expires, maxExpiry) : maxExpiry } : data.type === 'state' ?
      { type: 'state', id: data.id, state: data.state, detail: data.detail } : data.type === 'reaction' ?
      { type: 'reaction', id: data.id, reaction: data.reaction } : { type: data.type, id: data.id };
    if (event.type === 'deploy') room.latest = event;
    if (event.type === 'state') room.phase = event;
    if (event.type === 'panic' || event.type === 'clear') { room.latest = null; room.phase = null; }
    for (const other of room.peers) if (other !== peer) other.send(event);
  }
  server.on('upgrade', (req, socket, head) => acceptWebSocket(req, socket, head, message, leave));
}
