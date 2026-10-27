async page => {
  const base = 'http://127.0.0.1:3000';
  await page.goto(`${base}/#/stage`);
  await page.reload();
  await page.waitForSelector('.state-chip[data-state="idle"].is-on');
  await page.evaluate(() => {
    let index = 0;
    const random = [0.995, 0.5, 0.9, 0.5];
    Math.random = () => random[index++ % random.length];
    window.__alphaSamples = [];
    const descriptor = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'globalAlpha');
    Object.defineProperty(CanvasRenderingContext2D.prototype, 'globalAlpha', {
      configurable: true,
      get: descriptor.get,
      set(value) { window.__alphaSamples.push(value); descriptor.set.call(this, value); },
    });
  });
  await page.locator('#judgePrompt').fill('rubber ducks');
  const started = Date.now();
  await page.locator('#judgeCompile').click();
  await page.waitForFunction(() => document.body.dataset.roundState === 'active');
  const compileMs = Date.now() - started;
  await page.waitForFunction(() => window.__alphaSamples.includes(0.7), { timeout: 4000 });
  const panic = await page.evaluate(() => {
    const start = performance.now();
    document.querySelector('#panicMiniBtn').click();
    const canvas = document.querySelector('#stageOverlay canvas');
    const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    let nonTransparent = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i]) nonTransparent += 1;
    return { ms: performance.now() - start, nonTransparent, sound: document.querySelector('#soundLabel').textContent };
  });
  if (panic.nonTransparent || panic.sound !== 'SFX OFF') throw new Error(JSON.stringify(panic));
  return { localCompileObservedMs: compileMs, centerAlphaObserved: 0.7, panic };
}
