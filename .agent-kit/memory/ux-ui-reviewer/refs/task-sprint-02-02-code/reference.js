async page => {
 await page.setViewportSize({width:1440,height:900});
 await page.goto('file:///C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/specs/design-handoff/index.html');
 await page.waitForTimeout(1000); await page.screenshot({path:'reference-stage-1440.png',fullPage:true});
 return {url:page.url(),title:await page.title(), body:(await page.locator('body').innerText()).slice(0,1200)};
}
