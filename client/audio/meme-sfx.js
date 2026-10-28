const PATCHES = {
  bonk: { start: 620, end: 160, duration: 0.16, type: 'triangle', volume: 0.13 },
  bruh: { start: 180, end: 65, duration: 0.42, type: 'sawtooth', volume: 0.055 },
  boom: { start: 150, end: 35, duration: 0.7, type: 'sine', volume: 0.16 },
};

export function playMemeSound(context, kind) {
  const patch = PATCHES[kind];
  if (!patch) return false;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = patch.type;
  oscillator.frequency.setValueAtTime(patch.start, now);
  oscillator.frequency.exponentialRampToValueAtTime(patch.end, now + patch.duration);
  gain.gain.setValueAtTime(patch.volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + patch.duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  if (kind === 'boom') {
    const delay = context.createDelay();
    const feedback = context.createGain();
    delay.delayTime.value = 0.13;
    feedback.gain.value = 0.24;
    gain.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(context.destination);
    oscillator.onended = () => {
      setTimeout(() => { delay.disconnect(); feedback.disconnect(); gain.disconnect(); }, 1000);
    };
  }
  oscillator.start(now);
  oscillator.stop(now + patch.duration);
  return true;
}
