import { createRaid } from '../sync/raid.js';

export function wireRaid(getAst, deploy) {
  const status = document.getElementById('raidStatus');
  const log = document.getElementById('raidLog');
  function logLine(text) {
    const line = document.createElement('p');
    line.className = 'raid-log__row';
    line.textContent = text;
    log.prepend(line);
  }
  const raid = createRaid((ast) => {
    deploy(ast);
    logLine('Cartridge received from rival.');
  }, (text) => { status.textContent = text; }, (count) => {
    logLine(count ? `Cartridge sent to ${count} rival connection(s).` : 'No rival is connected; cartridge was not sent.');
  });
  document.getElementById('joinRoom').addEventListener('click', () => {
    const room = document.getElementById('roomCode').value.toUpperCase();
    status.textContent = raid.connect(room) ? `CONNECTING TO ${room}` : 'INVALID ROOM CODE';
  });
  document.getElementById('sendCart').addEventListener('click', () => {
    const ast = getAst();
    if (!ast) logLine('Compile or select a cartridge first.');
    else if (!raid.send(ast)) logLine('Room is not connected.');
    else logLine('Sending cartridge…');
  });
}
