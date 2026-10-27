import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createHandler } from './http.js';
import { createOpenAITransport } from './openai.js';
import { attachRooms } from './rooms.js';

export function createApp({ root = process.cwd(), transport, accessToken } = {}) {
  const server = createServer(createHandler(root, transport, accessToken));
  attachRooms(server);
  return server;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env.PORT || 3000);
  const server = createApp({ transport: createOpenAITransport(process.env.OPENAI_API_KEY),
    accessToken: process.env.COMPILER_ACCESS_TOKEN });
  server.listen(port, '127.0.0.1', () => console.log(`ChaosForge listening on localhost port ${port}`));
}
