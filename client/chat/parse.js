const MAX_BUFFER = 16384;
const MAX_MESSAGE = 500;

// Returns one vote per message only when all vote tokens agree.
export function parseCommand(text) {
  if (typeof text !== 'string' || text.length > MAX_MESSAGE) return [];
  const input = text.trim();
  const forge = /^!forge\s+(.+)$/i.exec(input);
  if (forge && forge[1].trim()) return [{ type: 'forge', idea: forge[1].trim() }];
  if (/^!shield$/i.test(input)) return [{ type: 'shield' }];
  if (/^!boost$/i.test(input)) return [{ type: 'boost' }];
  const events = [];
  const votes = new Set(input.match(/(?<![\p{L}\p{N}])[123](?![\p{L}\p{N}])/gu) || []);
  if (votes.size === 1) events.push({ type: 'vote', choice: Number([...votes][0]) });
  const emotes = input.match(/(?<![\p{L}\p{N}_])(?:LUL|PogChamp)(?![\p{L}\p{N}_])/gu) || [];
  for (const emote of emotes) events.push({ type: 'emote', emote });
  return events;
}

export function parseIrcLine(line) {
  if (typeof line !== 'string' || line.length > MAX_BUFFER) return null;
  const ping = /^PING(?:\s+:(.*)|\s+(\S+))?$/.exec(line);
  if (ping) return { type: 'ping', payload: ping[1] ?? ping[2] ?? '' };
  const message = /^(?:@([^ ]+) )?:([^ !]+)(?:![^ ]+)? PRIVMSG (#[^ ]+) :(.*)$/.exec(line);
  if (!message || message[4].length > MAX_MESSAGE) return null;
  return {
    type: 'message', user: message[2], channel: message[3], text: message[4],
    events: parseCommand(message[4]),
  };
}

// Each instance maintains an incomplete IRC frame across incoming chunks.
export function createIrcParser() {
  let buffer = '';
  let discarding = false;
  return {
    push(chunk) {
      if (typeof chunk !== 'string') throw new TypeError('IRC chunk must be a string');
      const events = [];
      for (const char of chunk) {
        if (char === '\n') {
          if (!discarding) {
            const parsed = parseIrcLine(buffer.endsWith('\r') ? buffer.slice(0, -1) : buffer);
            if (parsed) events.push(parsed);
          }
          buffer = '';
          discarding = false;
        } else if (!discarding) {
          buffer += char;
          if (buffer.length > MAX_BUFFER) {
            buffer = '';
            discarding = true;
          }
        }
      }
      return events;
    },
  };
}
