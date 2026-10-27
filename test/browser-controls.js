async page => {
  const base = 'http://127.0.0.1:3000';
  await page.goto(`${base}/#/deck`);
  await page.waitForSelector('.state-chip[data-state="idle"].is-on');
  await page.locator('#approveMode [data-mode="mod"]').click();
  await page.evaluate(() => { location.hash = '#/stage'; });
  await page.locator('#judgePrompt').fill('shield');
  await page.locator('#judgeCompile').click();
  await page.waitForFunction(() => document.querySelector('#stateTimer').textContent === 'WAITING FOR MOD APPROVAL');
  await page.evaluate(() => { location.hash = '#/deck'; });
  await page.locator('#approveNext').click();
  await page.waitForFunction(() => document.body.dataset.roundState === 'active');
  const cards = await page.locator('#cartGrid .cart').count();
  await page.evaluate(() => { location.hash = '#/stage'; });
  await page.locator('#judgePrompt').fill('bomb');
  await page.locator('#judgeCompile').click();
  await page.waitForFunction(() => document.body.dataset.roundState === 'blocked');
  const blocked = await page.locator('#stateTimer').innerText();
  await page.locator('#judgePrompt').fill('input');
  await page.locator('#judgePrompt').press('Space');
  const inputState = await page.evaluate(() => document.body.dataset.roundState);
  await page.locator('body').click({ position: { x: 2, y: 2 } });
  await page.keyboard.press('Space');
  const panic = await page.evaluate(() => document.body.dataset.roundState);
  await page.evaluate(() => { location.hash = '#/deck'; });
  await page.locator('#roomCode').fill('AAA1');
  await page.locator('#joinRoom').click();
  await page.waitForFunction(() => document.querySelector('#raidStatus').textContent === 'CONNECTED TO AAA1');
  const rival = await page.context().newPage();
  await rival.goto(`${base}/#/deck`);
  await rival.waitForSelector('.state-chip[data-state="idle"].is-on');
  await rival.locator('#roomCode').fill('BBB2');
  await rival.locator('#joinRoom').click();
  await rival.waitForFunction(() => document.querySelector('#raidStatus').textContent === 'CONNECTED TO BBB2');
  await page.locator('#cartGrid .cart').first().click();
  await page.waitForFunction(() => document.querySelector('#queueNowName').textContent !== 'NO PATCH');
  await rival.waitForTimeout(300);
  const rivalName = await rival.locator('#queueNowName').innerText();
  await rival.close();
  if (cards < 7 || !blocked.includes('PROMPT BLOCKED') || inputState !== 'blocked' ||
      panic !== 'panic' || rivalName !== 'NO PATCH') {
    throw new Error(JSON.stringify({ cards, blocked, inputState, panic, rivalName }));
  }
  return { cards, blocked, inputState, panic, rivalName };
}
