import { validateAst } from '../../shared/ast-validate.js';
import { createSocket } from './socket.js';

export function createRaid(onReceive, onStatus, onResult) {
  let socket;
  function connect(room) {
    if (!/^[A-Z0-9]{4}$/.test(room)) return false;
    socket?.close();
    socket = createSocket({ type: 'join', kind: 'raid', room }, (event) => {
      if (event.type === 'raid-receive' && validateAst(event.ast)) onReceive(event.ast);
      if (event.type === 'raid-result' && Number.isInteger(event.delivered)) onResult(event.delivered);
    }, (connected) => onStatus(connected ? `CONNECTED TO ${room}` : 'DISCONNECTED · RETRYING'));
    return true;
  }
  function send(ast) {
    if (!validateAst(ast)) return false;
    return socket?.send({ type: 'raid-send', id: crypto.randomUUID(), ast }) || false;
  }
  return { connect, send };
}
