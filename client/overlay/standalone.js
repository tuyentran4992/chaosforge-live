import { createOverlay } from './engine.js';
import { createSync } from '../sync/channel.js';
import { validStudioId } from '../ui/obs-link.js';

const overlay = createOverlay(document.getElementById('obsMount'));
const studio = new URLSearchParams(location.search).get('studio');
if (!validStudioId(studio)) document.getElementById('obsWarning').hidden = false;
else {
  createSync((event) => {
    if (['panic', 'clear', 'expire'].includes(event.type)) overlay.clear();
    else if (event.type === 'state') overlay.showState(event.state, event.detail);
    else if (event.type === 'reaction') overlay.react();
    else overlay.deploy(event.ast, event.expires);
  }, studio);
}
