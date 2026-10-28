# ChaosForge Live

**🎮 Live Interactive Web Demo:** [https://tuyentran4992.github.io/chaosforge-live/](https://tuyentran4992.github.io/chaosforge-live/)

Requires Node.js 24. Start the local Studio with `npm start` and open
`http://127.0.0.1:3000`. Run unit and integration checks with `npm test`.

The server binds to loopback by default. For access from another machine, put
it behind a trusted HTTPS reverse proxy that forwards WebSocket upgrades to
`127.0.0.1:3000`, and restrict access to the people using the demo. HTTPS is
also required for browser cryptographic APIs away from localhost. Do not expose
the Node port directly to an untrusted network. The OBS URL is unique to a
Studio; use **Open Source** or **Copy** in that Studio. Raid rooms are separate
from the Studio–OBS channel.

Local compilation needs no credentials. To enable the paid remote compiler,
set `OPENAI_API_KEY` and a random `COMPILER_ACCESS_TOKEN` of at least 32 bytes in the server
environment before starting. The compiler requires this separate token, asks
for it in the Studio when needed, and applies request and concurrency limits.
Never put the OpenAI key in a browser, source file or URL. Use HTTPS when
entering the access token from a different device. If the token is absent,
remote compilation remains inaccessible. Requests may fall back to local
synthesis if the remote service fails or times out.

Room codes are not private authentication. Keep the proxy restricted; anyone
who can access it and knows a room code can join that room. The keyword guard
is a limited filter and is not comprehensive moderation.

## Primary Codex Session
- Primary Codex Session ID: `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2`

## Local Fallback & Safety Policy
The local synthesizer operates with clause-level negation stripping (splitting on
`[.;,!?]` or conjunctions and dropping negative clauses). When no positive mechanism
keywords match after negation removal, it returns a safe neutral default (`gravity: 0.5`,
`collision: 'bounce'`, tags containing `'uncertain'`) and reports `uncertain: true`,
rendered as `LOCAL (DEFAULT)` on telemetry and `✓ AST SAFE · DEFAULT FALLBACK` on the
compiler frame.

A 4-layer ToS safety guard protects live broadcast:
1. Static keyword & control character filter (`shared/safety.js`) before compiler calls.
2. Pre-poll idea screening in `round.addIdea(idea)` to reject unsafe submissions.
3. Closed-world AST whitelist (`shared/ast-validate.js`) restricting renderable shapes and sounds.
4. Streamer control with Mod Approval mode and sub-100ms Spacebar Panic Clear.

## Broadcast Poll Layout
Long poll ideas up to 160 characters display in full within the 340 × 352 OBS panel
without `-webkit-line-clamp: 2`. Adaptive typography (`data-len="sm|md|lg"`) scales font
sizes (16px base for <= 48 chars, 13.5px for 49–96 chars, 11.5px for 97–160 chars) so
all three choices fit completely within the panel (`scrollHeight <= clientHeight`).

