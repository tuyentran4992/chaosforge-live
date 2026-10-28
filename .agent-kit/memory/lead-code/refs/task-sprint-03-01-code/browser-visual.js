async page => {
  await page.goto('http://127.0.0.1:4319/#/stage');
  await page.setViewportSize({width:1920,height:1080});
  await page.locator('#judgePrompt').fill('!forge bonk doge storm with boom sound');
  await page.locator('#judgeCompile').click();
  await page.waitForTimeout(800);
  await page.screenshot({path:'C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/final-doge.png'});
  await page.locator('#judgePrompt').fill('!forge popcat');
  await page.locator('#judgeCompile').click();
  await page.waitForTimeout(800);
  await page.screenshot({path:'C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/final-popcat.png'});
  return {doge:'final-doge.png',popcat:'final-popcat.png'};
}
