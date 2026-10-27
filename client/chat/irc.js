import { createIrcParser } from './parse.js';

export function connectTwitch(channel, onMessage, onStatus) {
  const name = channel.trim().replace(/^#/, '').toLowerCase();
  if (!/^[a-z0-9_]{1,25}$/.test(name)) throw new TypeError('Invalid Twitch channel');
  const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
  const parser = createIrcParser();
  socket.onopen = () => {
    socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
    socket.send('PASS SCHMOOPIIE');
    socket.send(`NICK justinfan${Math.floor(10000 + Math.random() * 900000)}`);
    socket.send(`JOIN #${name}`);
    onStatus('CONNECTED TO #' + name.toUpperCase());
  };
  socket.onmessage = (message) => {
    for (const event of parser.push(String(message.data))) {
      if (event.type === 'ping') socket.send(`PONG :${event.payload}`);
      else onMessage(event);
    }
  };
  socket.onerror = () => onStatus('CONNECTION ERROR');
  socket.onclose = () => onStatus('DISCONNECTED');
  return socket;
}
