import { shell } from './ui/shell.js';
import { stage } from './ui/stage.js';
import { overlayView } from './ui/overlay-view.js';
import { deck } from './ui/deck.js';
import { createOverlay } from './overlay/engine.js';
import { startArcade } from './game/arcade.js';
import { createSync } from './sync/channel.js';
import { createLibrary } from './cartridges/library.js';
import { createRound } from './round/controller.js';
import { connectTwitch } from './chat/irc.js';
import { parseCommand } from './chat/parse.js';
import { simulateCrowd } from './chat/simulator.js';
import { wireRaid } from './ui/raid-controls.js';
import { wireCrowdTabs } from './ui/crowd-tabs.js';
import { createSound } from './audio/sfx.js';
import { makeObsUrl, validStudioId } from './ui/obs-link.js';
import { encodePoll } from './round/poll.js';

document.getElementById('app').innerHTML = shell();
document.getElementById('views').innerHTML = stage() + overlayView() + deck();
const $ = (selector) => document.querySelector(selector);
const overlays = [createOverlay($('#stageOverlay')), createOverlay($('#overlayPreview'))];
const arcade = startArcade($('#gameCanvas'), {
  targets: () => overlays[0].targets(),
  hit: (index) => {
    overlays.forEach((overlay) => overlay.remove(index));
    $('#gameEntities').textContent = overlays[0].count();
    $('#telEntities').textContent = `${overlays[0].count()} / ${$('#maxEnt').value}`;
  },
});
let currentAst = null;
const sound = createSound();
let crowdStop;
let twitch;
let autoDemoTimer;
let studio = sessionStorage.getItem('chaosforge-studio');
if (!validStudioId(studio)) {
  studio = crypto.randomUUID();
  sessionStorage.setItem('chaosforge-studio', studio);
}
const sourceUrl = makeObsUrl(location.href, studio);
$('#obsUrl').textContent = sourceUrl.href;
for (const link of document.querySelectorAll('a[href="overlay.html"]')) link.href = sourceUrl.href;
const sync = createSync((event) => {
  if (['panic', 'clear', 'expire'].includes(event.type)) {
    overlays.forEach((overlay) => overlay.clear());
    arcade.clear();
    currentAst = null;
    if (event.type === 'panic') {
      sound.setEnabled(false);
      $('#soundLabel').textContent = 'SFX OFF';
      $('#muteState').textContent = 'SOUND OFF';
    }
    $('#queueNowName').textContent = 'NO PATCH';
  } else if (event.type === 'state') {
    overlays.forEach((overlay) => overlay.showState(event.state, event.detail));
  } else if (event.type === 'reaction') {
    overlays.forEach((overlay) => overlay.react());
  } else {
    currentAst = event.ast;
    overlays.forEach((overlay) => overlay.deploy(event.ast, event.expires));
    sound.play(event.ast.sfx);
    $('#queueNowName').textContent = event.ast.entity.toUpperCase();
    $('#queueNowTags').textContent = event.ast.tags.join(' · ');
  }
  $('#gameEntities').textContent = overlays[0].count();
  $('#telEntities').textContent = `${overlays[0].count()} / ${$('#maxEnt').value}`;
}, studio);
const library = createLibrary($('#cartGrid'), (ast) => round.deployCartridge(ast));
const round = createRound({
  deploy: (ast) => sync.publish('deploy', ast),
  panic: () => sync.publish('panic'),
  onEnd: () => sync.publish('clear'),
  onState: (state, detail) => {
    document.body.dataset.roundState = state;
    $('#stateTimer').textContent = detail;
    for (const chip of document.querySelectorAll('.state-chip')) chip.classList.toggle('is-on', chip.dataset.state === state);
    $('#queueNowState').textContent = state.toUpperCase();
    sync.publish('state', { state, detail });
  },
  onCompiled: (prompt, result) => {
    if (!result.blocked && prompt) library.save(prompt, result.ast);
    else if (result.blocked) sync.publish('state', { state: 'blocked', detail: 'PROMPT BLOCKED BY TOS GUARD — DEPLOYING SAFE RUBBER DUCK FALLBACK' });
    const isDefault = result.uncertain || result.ast?.tags?.includes('uncertain');
    $('#telCompile').textContent = isDefault ? 'LOCAL (DEFAULT)' : result.source.toUpperCase();
  },
  onPoll: (ideas, votes, seconds) => {
    $('#stateTimer').textContent = `VOTING · ${Math.ceil(seconds)}s`;
    const detail = encodePoll(ideas, votes, seconds);
    sync.publish('state', { state: 'voting', detail });
  },
});
wireRaid(() => currentAst, (ast) => round.deployCartridge(ast));
document.querySelector('.state-chip[data-state="idle"]').classList.add('is-on');

function route() {
  const name = location.hash.slice(2) || 'stage';
  const selected = ['stage', 'overlay', 'deck'].includes(name) ? name : 'stage';
  for (const view of document.querySelectorAll('.view')) view.classList.toggle('is-active', view.id === `view-${selected}`);
  for (const link of document.querySelectorAll('[data-view]')) link.classList.toggle('is-active', link.dataset.view === selected);
}
window.addEventListener('hashchange', route);
route();

function toggleSound() {
  const enabled = !sound.isEnabled();
  sound.setEnabled(enabled);
  $('#soundLabel').textContent = enabled ? 'SFX ON' : 'SFX OFF';
  $('#muteState').textContent = enabled ? 'SOUND ON' : 'SOUND OFF';
  $('#soundBtn').setAttribute('aria-pressed', String(enabled));
  $('#muteBtn').setAttribute('aria-pressed', String(!enabled));
}
function addChat(user, text, feed = $('#chatFeed')) {
  feed.querySelector('.chat-empty')?.remove();
  feed.classList.remove('chat-feed--empty');
  const row = document.createElement('p');
  row.className = 'chat-line';
  row.textContent = `${user}: ${text}`;
  feed.append(row);
  while (feed.children.length > 80) feed.firstElementChild.remove();
  feed.scrollTop = feed.scrollHeight;
  for (const event of parseCommand(text)) {
    if (event.type === 'forge') round.addIdea(event.idea);
    if (event.type === 'vote') round.vote(event.choice);
    if (['emote', 'shield', 'boost'].includes(event.type)) {
      sync.publish('reaction', event.type);
      sound.play('pop');
    }
  }
}

$('#judgeCompile').addEventListener('click', () => {
  const prompt = $('#judgePrompt').value.trim().replace(/^!forge\s+/i, '');
  const invalid = !prompt || /^!forge$/i.test(prompt);
  $('#judgeError').hidden = !invalid;
  $('#judgePrompt').setAttribute('aria-invalid', String(invalid));
  if (invalid) $('#judgePrompt').focus();
  else round.compile(prompt);
});
$('#judgePrompt').addEventListener('input', (event) => {
  $('#judgeCount').textContent = `${event.target.value.length} / 160`;
  $('#judgeError').hidden = true;
  $('#judgePrompt').removeAttribute('aria-invalid');
});
for (const button of document.querySelectorAll('[data-prompt]')) button.addEventListener('click', () => {
  $('#judgePrompt').value = button.dataset.prompt;
  $('#judgePrompt').dispatchEvent(new Event('input'));
});
for (const button of document.querySelectorAll('#panicBtn, #panicMiniBtn')) button.addEventListener('click', round.clear);
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(event.target.tagName) && !event.target.isContentEditable) {
    event.preventDefault();
    round.clear();
  }
});
$('#soundBtn').addEventListener('click', toggleSound);
$('#muteBtn').addEventListener('click', toggleSound);
$('#startVoteBtn').addEventListener('click', round.startVoting);
$('#autoDemo').addEventListener('click', (event) => {
  const enabled = event.currentTarget.getAttribute('aria-pressed') !== 'true';
  event.currentTarget.setAttribute('aria-pressed', String(enabled));
  clearInterval(autoDemoTimer);
  if (enabled) {
    round.startVoting();
    autoDemoTimer = setInterval(() => { if (round.state() === 'idle') round.startVoting(); }, 1000);
  }
});
for (const button of document.querySelectorAll('#approveMode button')) button.addEventListener('click', () => {
  round.setApproval(button.dataset.mode);
  $('#queueModeNote').textContent = button.dataset.mode === 'mod' ? 'MOD APPROVAL' : 'AUTO APPROVE';
  for (const sibling of document.querySelectorAll('#approveMode button')) sibling.classList.toggle('is-on', sibling === button);
});
$('#approveNext').addEventListener('click', round.approve);
$('#pauseRound').addEventListener('click', (event) => {
  event.currentTarget.textContent = round.togglePause() ? 'RESUME VOTE' : 'PAUSE ROUND';
});
$('#skipRound').addEventListener('click', round.skip);
$('#fallbackRound').addEventListener('click', () => round.compile('rubber ducks'));
$('#hypeBtn').addEventListener('click', () => {
  if (crowdStop) crowdStop();
  $('#viewerCount').textContent = '500';
  $('#topViewers').textContent = '500';
  $('#chatRate').textContent = '750';
  $('#votePulse').textContent = '12/s';
  crowdStop = simulateCrowd(addChat);
  round.startVoting();
});
wireCrowdTabs();
$('#connectTwitch').addEventListener('click', () => {
  if (twitch) {
    twitch.close();
    twitch = null;
    $('#connectTwitch').textContent = 'CONNECT';
    $('#liveStatus').textContent = 'DISCONNECTED';
    return;
  }
  try {
    twitch = connectTwitch($('#twitchChannel').value,
      (event) => addChat(event.user, event.text, $('#liveFeed')),
      (status) => {
        $('#liveStatus').textContent = status;
        const live = status.startsWith('CONNECTED TO');
        $('#connectTwitch').textContent = live ? 'DISCONNECT' : 'CONNECT';
        if (!live) twitch = null;
      });
  } catch {
    twitch = null;
    $('#connectTwitch').textContent = 'CONNECT';
    $('#liveStatus').textContent = 'INVALID CHANNEL';
  }
});
for (const button of document.querySelectorAll('#pilotMode button')) button.addEventListener('click', () => {
  arcade.setManual(button.dataset.mode === 'manual');
  for (const sibling of document.querySelectorAll('#pilotMode button')) sibling.classList.toggle('is-on', sibling === button);
});
$('#maxEnt').addEventListener('input', (event) => {
  $('#maxEntVal').textContent = event.target.value;
  overlays.forEach((overlay) => overlay.setLimit(event.target.value));
});
$('#guideToggle').addEventListener('click', () => overlays[0].toggleGuide());
$('#ovGuide').addEventListener('click', () => overlays[1].toggleGuide());
$('#copyUrl').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(sourceUrl.href);
    $('#copyStatus').textContent = 'Studio URL copied.';
  } catch { $('#copyStatus').textContent = 'Copy failed. Select and copy the URL above.'; }
});
for (const button of document.querySelectorAll('[data-state]')) button.addEventListener('click', () => {
  if (button.dataset.state === 'panic') round.clear();
  else if (button.dataset.state === 'voting') round.startVoting();
  else if (button.dataset.state === 'blocked') round.compile('bomb');
  else if (button.dataset.state === 'idle') round.idle();
  else round.compile('rubber ducks');
});
