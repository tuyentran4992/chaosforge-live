const tones = {
  quack: { frequency: 330, type: 'square' },
  pop: { frequency: 660, type: 'square' },
  laser: { frequency: 140, type: 'sawtooth' },
};

export function createSound(makeContext = () => new AudioContext()) {
  let context;
  let enabled = true;
  function setEnabled(value) {
    enabled = Boolean(value);
    if (!enabled && context) context.suspend();
  }
  function play(kind) {
    if (!enabled || !Object.hasOwn(tones, kind)) return;
    try {
      context ||= makeContext();
      context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = tones[kind].type;
      oscillator.frequency.value = tones[kind].frequency;
      gain.gain.value = 0.02;
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.08);
    } catch { /* Audio is optional when a device does not provide it. */ }
  }
  return { play, setEnabled, isEnabled: () => enabled };
}
