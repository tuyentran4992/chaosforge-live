async page => {
  const base = 'http://127.0.0.1:3000';
  const sizes = [[360,800], [390,844], [430,932], [600,960], [820,1180],
    [1024,768], [1366,768], [1440,900], [1920,1080]];
  const results = [];
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    for (const route of ['stage', 'overlay', 'deck']) {
      await page.goto(`${base}/#/${route}`);
      await page.locator(`#view-${route}.is-active`).waitFor();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      results.push({ width, height, route, overflow });
    }
    for (const file of ['overlay.html', 'design-system.html']) {
      await page.goto(`${base}/${file}`);
      results.push({ width, height, route: file,
        overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) });
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/#/stage`);
  await page.waitForSelector('.state-chip[data-state="idle"].is-on');
  const obs = await page.context().newPage();
  await obs.goto(await page.locator('#view-stage a[href*="overlay.html"]').getAttribute('href'));
  await page.locator('#judgePrompt').fill('rubber ducks');
  await page.locator('#judgeCompile').click();
  await page.waitForFunction(() => document.body.dataset.roundState === 'active');
  await obs.waitForSelector('.ov[data-state="active"]');
  const compiled = await page.locator('#queueNowName').innerText();
  await page.locator('#panicMiniBtn').click();
  await obs.waitForSelector('.ov[data-state="panic"]');
  const muted = await page.locator('#soundLabel').innerText();
  await page.locator('#hypeBtn').click();
  const initial = await page.evaluate(() => document.body.dataset.roundState);
  await page.waitForFunction(() => document.body.dataset.roundState === 'active', { timeout: 20000 });
  const viewers = await page.locator('#viewerCount').innerText();
  await obs.close();
  const overflow = results.filter((item) => item.overflow);
  if (overflow.length || compiled !== 'DUCK' || muted !== 'SFX OFF' || initial !== 'voting' || viewers !== '500') {
    throw new Error(JSON.stringify({ overflow, compiled, muted, initial, viewers }));
  }
  return { viewportChecks: results.length, overflow, compiled, muted, initial, viewers };
}
