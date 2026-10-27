import test from 'node:test';
import assert from 'node:assert/strict';
import { createSound } from '../client/audio/sfx.js';

test('AST sound kinds select distinct tones and mute prevents playback', () => {
  const played = [];
  let suspended = 0;
  const context = { currentTime: 1, destination: {}, resume() {}, suspend() { suspended += 1; },
    createOscillator() {
      const osc = { frequency: {}, connect() { return { connect() {} }; },
        start() { played.push({ type: osc.type, frequency: osc.frequency.value }); }, stop() {} };
      return osc;
    },
    createGain: () => ({ gain: {} }),
  };
  const sound = createSound(() => context);
  for (const kind of ['quack', 'pop', 'laser', 'none']) sound.play(kind);
  assert.deepEqual(played, [{ type: 'square', frequency: 330 }, { type: 'square', frequency: 660 },
    { type: 'sawtooth', frequency: 140 }]);
  sound.setEnabled(false);
  sound.play('pop');
  assert.equal(played.length, 3);
  assert.equal(suspended, 1);
});
