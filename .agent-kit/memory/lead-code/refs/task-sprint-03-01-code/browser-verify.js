async page => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://127.0.0.1:4319/#/stage');
  await page.waitForSelector('.state-chip[data-state="idle"].is-on');
  await page.evaluate(() => {
    window.verifyStates = ['idle'];
    new MutationObserver(() => window.verifyStates.push(document.body.dataset.roundState))
      .observe(document.body, { attributes: true, attributeFilter: ['data-round-state'] });
  });
  const results = {};
  await page.locator('#startVoteBtn').click();
  await page.waitForTimeout(250);
  results.vote = await page.evaluate(() => document.body.dataset.roundState);
  await page.locator('#judgePrompt').fill('!forge bonk doge storm with boom sound');
  await page.locator('#judgeCompile').click();
  await page.waitForTimeout(1000);
  results.doge = await page.evaluate(() => ({ state: document.body.dataset.roundState,
    name: document.querySelector('#stageOverlay [data-name]')?.textContent,
    ast: document.querySelector('#stageOverlay [data-code]')?.textContent }));
  await page.locator('#judgePrompt').fill('!forge popcat');
  await page.locator('#judgeCompile').click();
  await page.waitForTimeout(1000);
  results.popcat = await page.evaluate(() => ({ state: document.body.dataset.roundState,
    name: document.querySelector('#stageOverlay [data-name]')?.textContent }));
  await page.evaluate(() => document.activeElement.blur());
  await page.keyboard.press('Space');
  await page.waitForTimeout(200);
  results.panic = await page.evaluate(() => ({ state: document.body.dataset.roundState,
    entities: document.querySelector('#entityCount')?.textContent }));
  await page.locator('#judgePrompt').fill('bomb');
  await page.locator('#judgeCompile').click();
  await page.waitForTimeout(1000);
  results.blocked = await page.evaluate(() => document.body.dataset.roundState);
  results.states = await page.evaluate(() => window.verifyStates);
  return results;
}
