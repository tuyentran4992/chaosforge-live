export function createSocket(join, onMessage, onStatus = () => {}) {
  let socket;
  let retry;
  let ready = false;
  function connect() {
    clearTimeout(retry);
    const scheme = location.protocol === 'https:' ? 'wss:' : 'ws:';
    socket = new WebSocket(`${scheme}//${location.host}/ws`);
    socket.onopen = () => socket.send(JSON.stringify(join));
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'joined') { ready = true; onStatus(true); }
        onMessage(data);
      } catch { /* Ignore invalid messages. */ }
    };
    socket.onclose = () => { ready = false; onStatus(false); retry = setTimeout(connect, 2000); };
  }
  connect();
  return {
    send(event) {
      if (!ready || socket.readyState !== WebSocket.OPEN) return false;
      socket.send(JSON.stringify(event));
      return true;
    },
    close() { clearTimeout(retry); socket.onclose = null; ready = false; socket.close(); },
    isConnected: () => ready,
  };
}
