async page => {
 const out={}; await page.setViewportSize({width:360,height:800}); await page.goto('http://127.0.0.1:3001/#/stage');
 out.mobile=await page.evaluate(()=>{const n=document.querySelector('.viewnav'),s=document.querySelector('.state-track');return {nav:{client:n.clientWidth,scroll:n.scrollWidth,overflow:getComputedStyle(n).overflowX},state:{client:s.clientWidth,scroll:s.scrollWidth,overflow:getComputedStyle(s).overflowX}}});
 await page.locator('a[href="design-system.html"]').focus(); out.focus=await page.evaluate(()=>({active:document.activeElement.textContent,rect:document.activeElement.getBoundingClientRect().toJSON(),navScroll:document.querySelector('.viewnav').scrollLeft}));
 await page.setViewportSize({width:1440,height:900}); await page.goto('http://127.0.0.1:3001/#/stage');
 const obs=await page.context().newPage(); await obs.setViewportSize({width:1920,height:1080}); await obs.goto('http://127.0.0.1:3001/overlay.html');
 out.obsIdle=await obs.evaluate(()=>({bg:getComputedStyle(document.body).backgroundColor,text:document.body.innerText}));
 await page.locator('#judgePrompt').fill('reverse gravity laser boss'); await page.locator('#judgeCompile').click(); await page.waitForTimeout(500);
 out.obsAfter=await obs.evaluate(()=>({text:document.body.innerText,bg:getComputedStyle(document.body).backgroundColor})); await obs.screenshot({path:'obs-active.png',omitBackground:true}); await page.screenshot({path:'boss-active.png'}); await obs.close();
 await page.locator('[data-state="compiling"]').click(); await page.waitForTimeout(500); out.compilingClick=await page.evaluate(()=>({state:document.body.dataset.roundState,timer:document.querySelector('#stateTimer').textContent}));
 await page.locator('#startVoteBtn').click(); await page.waitForTimeout(3000); out.voteOverlay=await page.locator('#stageOverlay').innerText(); await page.screenshot({path:'vote-3s.png'});
 await page.locator('[data-tab="live"]').click(); await page.locator('#twitchChannel').fill(''); await page.locator('#connectTwitch').click(); out.twitchEmpty=await page.locator('#liveStatus').innerText();
 await page.goto('file:///C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/specs/design-handoff/design-system.html'); await page.waitForTimeout(300); await page.screenshot({path:'reference-ds-1440.png',fullPage:true}); out.referenceDS=(await page.locator('body').innerText()).slice(0,3000);
 return out;
}
