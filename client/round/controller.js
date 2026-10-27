import { BLOCKED_MESSAGE } from '../../shared/cartridges.js';
import { requestCompile } from './compile.js';
import { validateAst } from '../../shared/ast-validate.js';
import { isUnsafePrompt } from '../../shared/safety.js';
import { MAX_IDEA_LENGTH, MAX_POLL_IDEAS } from '../../shared/sync-contract.js';

export function createRound({ deploy, panic, onEnd = panic, onState, onCompiled, onPoll = () => {} }) {
  let state = 'idle';
  let timer = null;
  let generation = 0;
  let ideas = [];
  let votes = [0, 0, 0];
  let due = 0;
  let pending = null;
  let remaining = 0;
  let paused = false;
  let approvalMode = 'auto';
  let awaiting = null;
  let pollTicker;
  function setState(next, detail = '') {
    state = next;
    onState(state, detail);
  }
  function stopTimer() { clearTimeout(timer); clearInterval(pollTicker); timer = null; pending = null; paused = false; }
  function schedule(callback, delay) {
    pending = callback;
    remaining = delay;
    due = Date.now() + delay;
    timer = setTimeout(callback, delay);
  }
  function addIdea(idea) {
    if (typeof idea === 'string' && idea.trim() && !isUnsafePrompt(idea) && ideas.length < MAX_POLL_IDEAS) {
      ideas.push(idea.trim().slice(0, MAX_IDEA_LENGTH));
      if (state === 'idle' || state === 'panic') startVoting();
      else if (state === 'voting') emitPoll();
    }
  }
  function vote(choice) {
    if (state === 'voting' && Number.isInteger(choice) && choice >= 1 && choice <= 3) {
      votes[choice - 1] += 1;
      emitPoll();
    }
  }
  function activate(prompt, result, current) {
    if (current !== generation) return;
    if (result.blocked) setState('blocked', BLOCKED_MESSAGE);
    else setState('active', 'ACTIVE CHAOS');
    deploy(result.ast);
    onCompiled(prompt, result);
    schedule(() => { if (current === generation) { onEnd(); setState('idle', 'IDLE · READY'); } }, result.ast.duration * 1000);
  }
  async function compile(prompt) {
    stopTimer();
    awaiting = null;
    const current = ++generation;
    setState('compiling', 'COMPILING AST');
    try {
      const result = await requestCompile(prompt);
      if (!result || !validateAst(result.ast) || typeof result.blocked !== 'boolean') throw new Error('Invalid compiler response');
      if (current !== generation) return;
      if (approvalMode === 'mod' && !result.blocked) {
        awaiting = { prompt, result, current };
        setState('compiling', 'WAITING FOR MOD APPROVAL');
      } else activate(prompt, result, current);
    } catch (error) {
      if (current === generation) setState('idle', error.message.toUpperCase());
    }
  }
  function startVoting() {
    stopTimer();
    generation += 1;
    votes = [0, 0, 0];
    setState('voting', 'VOTING · 15s');
    schedule(() => {
      while (ideas.length < 3) ideas.push(['Rubber duck rain', 'Laser boss', 'Floating stars'][ideas.length]);
      const winner = votes.indexOf(Math.max(...votes));
      const prompt = ideas[winner];
      ideas = [];
      compile(prompt);
    }, 15000);
    emitPoll();
    pollTicker = setInterval(emitPoll, 250);
  }
  function emitPoll() {
    const seconds = Math.max(0, (paused ? remaining : due - Date.now()) / 1000);
    onPoll([...ideas], [...votes], seconds);
  }
  function clear() {
    generation += 1;
    awaiting = null;
    stopTimer();
    ideas = [];
    votes = [0, 0, 0];
    panic();
    setState('panic', 'PANIC CLEAR');
  }
  function idle() {
    generation += 1;
    awaiting = null;
    stopTimer();
    panic();
    setState('idle', 'IDLE · READY');
  }
  function togglePause() {
    if (!pending || state !== 'voting') return false;
    if (paused) {
      paused = false;
      schedule(pending, remaining);
    } else {
      paused = true;
      remaining = Math.max(0, due - Date.now());
      clearTimeout(timer);
    }
    return paused;
  }
  function skip() {
    if (state === 'voting' && pending) {
      clearTimeout(timer);
      pending();
    } else idle();
  }
  function approve() {
    if (!awaiting) return false;
    const item = awaiting;
    awaiting = null;
    activate(item.prompt, item.result, item.current);
    return true;
  }
  function deployCartridge(ast) {
    if (!validateAst(ast)) return false;
    stopTimer();
    awaiting = null;
    const current = ++generation;
    activate('', { ast, blocked: false, source: 'cartridge' }, current);
    return true;
  }
  return { addIdea, vote, compile, startVoting, clear, idle, togglePause, skip, approve, deployCartridge,
    setApproval: (mode) => { approvalMode = mode === 'mod' ? 'mod' : 'auto'; }, state: () => state };
}
