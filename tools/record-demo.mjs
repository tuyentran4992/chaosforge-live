import { execSync } from 'child_process';
import { setTimeout as sleep } from 'timers/promises';

const SESSION = process.argv[2] || 'pdli';

function bskEval(js) {
  try {
    const escaped = js.replace(/"/g, '\\"');
    const out = execSync(`bsk evaluate --session ${SESSION} "${escaped}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    return out.trim();
  } catch (err) {
    console.error(`bskEval error: ${err.message}`);
    return null;
  }
}

function runCmd(cmd) {
  try {
    const out = execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    return out.trim();
  } catch (err) {
    console.error(`runCmd error: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`[1/8] Setting up Stage view at http://127.0.0.1:3000/#stage...`);
  runCmd(`bsk navigate http://127.0.0.1:3000/#stage --session ${SESSION}`);
  await sleep(2000);

  console.log(`[2/8] Starting 120s Video Recording (clear quality, H.264 MP4)...`);
  const startOut = runCmd(`bsk video start --session ${SESSION} --duration 120s --quality clear --json`);
  console.log(`Recording started: ${startOut}`);
  await sleep(4000);

  console.log(`[3/8] Triggering 1-Click Simulate 500 Twitch Viewers Hype...`);
  bskEval(`(() => { const b = document.getElementById('hypeBtn'); if(b) b.click(); return 'hype clicked'; })()`);
  
  // Let chat stream and poll run for 16 seconds (poll countdown is 15s)
  console.log(`Waiting 16s for poll countdown and chat voting (4Hz telemetry)...`);
  await sleep(16000);

  // Poll finished, compiling & active chaos begins
  console.log(`[4/8] Round entered active chaos! Letting ducks/balls bounce for 8s...`);
  await sleep(8000);

  // Now submit Doge Meme Prompt in Judge drawer
  console.log(`[5/8] Submitting Doge Meme prompt via Judge drawer: !forge bonk doge storm with boom sound`);
  bskEval(`(() => {
    const input = document.getElementById('judgePrompt');
    if (input) {
      input.value = '!forge bonk doge storm with boom sound';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const btn = document.getElementById('judgeCompile');
    if (btn) btn.click();
    return 'doge prompt submitted';
  })()`);

  // Let Doge bounce with neon reaction badges for 14 seconds
  console.log(`Waiting 14s observing Doge physics, collisions & reaction badges...`);
  await sleep(14000);

  // Now submit Popcat Meme Prompt
  console.log(`[6/8] Submitting Popcat prompt: !forge zero gravity popcat invasion with bruh sound`);
  bskEval(`(() => {
    const input = document.getElementById('judgePrompt');
    if (input) {
      input.value = '!forge zero gravity popcat invasion with bruh sound';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const btn = document.getElementById('judgeCompile');
    if (btn) btn.click();
    return 'popcat prompt submitted';
  })()`);

  console.log(`Waiting 14s observing Popcat physics & reactions...`);
  await sleep(14000);

  // Demonstrate Broadcaster Safety: Panic Clear
  console.log(`[7/8] Demonstrating Broadcaster Safety: triggering Spacebar Panic Clear (<60ms)...`);
  bskEval(`(() => { const b = document.getElementById('panicMiniBtn'); if(b) b.click(); return 'panic cleared'; })()`);
  await sleep(3000);

  // Navigate to Streamer Deck (#deck)
  console.log(`[8/8] Navigating to Streamer Control Deck (#deck)...`);
  bskEval(`(() => { location.hash = '#deck'; return 'switched to #deck'; })()`);
  await sleep(5000);

  // Connect to Raid Room TW26 and fire chaos cartridge
  console.log(`Connecting to 2-Streamer Raid Room TW26 and sending chaos cartridge...`);
  bskEval(`(() => {
    const joinBtn = document.getElementById('joinRoom');
    if (joinBtn) joinBtn.click();
    setTimeout(() => {
      const sendBtn = document.getElementById('sendCart');
      if (sendBtn) sendBtn.click();
    }, 1500);
    return 'raid sent';
  })()`);
  await sleep(10000);

  // Switch to OBS Overlay (#overlay)
  console.log(`Switching to OBS Overlay View (#overlay)...`);
  bskEval(`(() => { location.hash = '#overlay'; return 'switched to #overlay'; })()`);
  await sleep(8000);

  // Return to Stage for closing hero shot
  console.log(`Returning to Stage (#stage) for finale hero shot...`);
  bskEval(`(() => { location.hash = '#stage'; return 'switched to #stage'; })()`);
  await sleep(8000);

  // Stop video recording and export
  console.log(`Stopping video recording and exporting to user/media/chaosforge-demo-2min.mp4...`);
  const stopOut = runCmd(`bsk video stop --out user/media/chaosforge-demo-2min.mp4 --overwrite`);
  console.log(`Recording stopped: ${stopOut}`);
  
  // Also copy to assets/media/
  runCmd(`copy user\\media\\chaosforge-demo-2min.mp4 assets\\media\\chaosforge-demo-2min.mp4`);
  runCmd(`copy user\\media\\chaosforge-demo-2min.mp4 .agent-kit\\user\\media\\chaosforge-demo-2min.mp4`);
  console.log(`Video saved to user/media/, assets/media/, and .agent-kit/user/media/!`);
}

main().catch(err => {
  console.error('Fatal error in video recording:', err);
  process.exit(1);
});
