async page => {
 const sizes=[[360,800],[390,844],[430,932],[600,960],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]];
 const out=[];
 for(const [w,h] of sizes) for(const route of ['#/stage','#/overlay','#/deck','overlay.html','design-system.html']) {
  await page.setViewportSize({width:w,height:h});
  await page.goto('http://127.0.0.1:3001/'+route); await page.waitForTimeout(100);
  const data=await page.evaluate(()=>({width:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,bodyWidth:document.body.scrollWidth,title:document.title,lang:document.documentElement.lang,clipped:[...document.querySelectorAll('button,input,textarea,a')].filter(e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width && r.height && s.visibility!=='hidden' && (r.left< -1 || r.right>innerWidth+1)}).map(e=>({text:e.innerText||e.getAttribute('aria-label')||e.id,left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)})).slice(0,8)}));
  out.push({size:`${w}x${h}`,route,...data});
  if ([360,1440].includes(w)) await page.screenshot({path:`${route.replace(/[^a-z]/g,'')}-${w}.png`,fullPage:true});
 }
 return out;
}
