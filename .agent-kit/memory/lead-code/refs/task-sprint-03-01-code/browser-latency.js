async page => {
  await page.goto('http://127.0.0.1:4319/#/stage');
  await page.locator('#judgePrompt').fill('!forge popcat');
  await page.locator('#judgeCompile').click();
  await page.waitForTimeout(500);
  await page.evaluate(() => document.activeElement.blur());
  await page.keyboard.press('Space');
  await page.waitForTimeout(200);
  const panic = await page.evaluate(() => document.body.dataset.roundState);
  const samples = await page.evaluate(async () => {
    const items = [];
    for (const prompt of ['!forge bonk doge storm with boom sound','!forge popcat']) {
      const start=performance.now();
      const response=await fetch('/api/compile',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
      const json=await response.json();
      items.push({prompt,status:response.status,elapsedMs:performance.now()-start,entity:json.ast?.entity,sfx:json.ast?.sfx});
    }
    return items;
  });
  return { panic, samples };
}
