import { createHash } from 'node:crypto';

const MAX_FRAME = 8192;
const MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

function frame(opcode, payload) {
  const body = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  const header = body.length < 126 ? Buffer.from([0x80 | opcode, body.length]) :
    Buffer.from([0x80 | opcode, 126, body.length >> 8, body.length & 255]);
  return Buffer.concat([header, body]);
}

export function acceptWebSocket(req, socket, head, onMessage, onClose) {
  const key = req.headers['sec-websocket-key'];
  if (req.url !== '/ws' || req.headers.upgrade?.toLowerCase() !== 'websocket' ||
      req.headers['sec-websocket-version'] !== '13' || typeof key !== 'string' ||
      !/^[A-Za-z0-9+/]{22}==$/.test(key)) {
    socket.destroy();
    return;
  }
  const accept = createHash('sha1').update(key + MAGIC).digest('base64');
  socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\n' +
    `Connection: Upgrade\r\nSec-WebSocket-Accept: ${accept}\r\n\r\n`);
  let buffer = Buffer.alloc(0);
  const peer = {
    send(value) {
      if (socket.destroyed || !socket.writable) return false;
      socket.write(frame(1, JSON.stringify(value)));
      return true;
    },
    close() { socket.end(frame(8, Buffer.alloc(0))); },
  };
  const receive = (data) => {
    buffer = Buffer.concat([buffer, data]);
    while (buffer.length >= 2) {
      const opcode = buffer[0] & 15;
      if (!(buffer[0] & 0x80) || (buffer[0] & 0x70) || !(buffer[1] & 0x80)) return peer.close();
      let size = buffer[1] & 127;
      let offset = 2;
      if (size === 127) return peer.close();
      if (size === 126) {
        if (buffer.length < 4) return;
        size = buffer.readUInt16BE(2);
        offset = 4;
      }
      if (size > MAX_FRAME || (opcode >= 8 && size > 125)) return peer.close();
      if (buffer.length < offset + 4 + size) return;
      const mask = buffer.subarray(offset, offset + 4);
      const body = Buffer.from(buffer.subarray(offset + 4, offset + 4 + size));
      buffer = buffer.subarray(offset + 4 + size);
      for (let i = 0; i < body.length; i += 1) body[i] ^= mask[i % 4];
      if (opcode === 8) return peer.close();
      if (opcode === 9) socket.write(frame(10, body));
      else if (opcode === 1) {
        try { onMessage(peer, JSON.parse(body.toString('utf8'))); }
        catch { peer.send({ type: 'error', message: 'Invalid message' }); }
      } else if (opcode !== 10) return peer.close();
    }
  };
  socket.on('data', receive);
  socket.on('close', () => onClose(peer));
  socket.on('error', () => socket.destroy());
  if (head.length) receive(head);
}
