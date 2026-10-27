# Context — coder

- Instance `/root/coder`; task `task-sprint-02-02-code`, handoff `task-sprint-02-02-code-coder-01`, revision `r9` (superseding `r8`).
- Status complete, source verified; result `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r9/result.md`; snapshot and line counts `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r9.md`.
- UX enhancements implemented:
  1. Arcade keyboard navigation (`client/game/arcade.js`): arrow keys prevent browser scroll in manual mode; physical key code detection (`keyw`, `keya`, `keys`, `keyd`) added for instantaneous responsiveness with Vietnamese Telex/Unikey IME; window blur key clearing added; pilot speed tuned to 360 px/s.
  2. Twitch CONNECT / DISCONNECT button toggle (`client/chat/irc.js` & `client/main.js`): socket.onopen broadcasts `CONNECTED TO #...`; clicking button disconnects existing socket and resets UI; status callback toggles button label between CONNECT and DISCONNECT.
  3. All 73 product files strictly <= 250 physical lines (`client/main.js` at 236 lines with `client/ui/crowd-tabs.js` extracted). 36/36 tests passed.
