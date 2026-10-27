import { validateAst } from '../../shared/ast-validate.js';
import { synthesize } from '../../shared/synthesize.js';

const STORAGE = 'chaosforge-cartridges-v1';
const samples = ['Rubber duck rain', 'Laser boss', 'Floating stars', '360 shield', 'Bouncing balls', 'Duck rescue'];

export function createLibrary(container, onDeploy) {
  let saved = [];
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE) || '[]');
    if (Array.isArray(value)) saved = value.filter((item) => item && typeof item.name === 'string' &&
      item.name.length <= 80 && validateAst(item.ast)).slice(0, 30);
  } catch { saved = []; }
  const builtins = samples.map((name) => ({ name, ast: synthesize(name) }));
  function render() {
    container.replaceChildren();
    for (const [index, item] of [...builtins, ...saved].entries()) {
      const card = document.createElement('button');
      card.className = 'cart';
      const top = document.createElement('div');
      top.className = 'cart__top';
      const icon = document.createElement('span');
      icon.className = 'cart__ico';
      icon.textContent = item.ast.entity === 'duck' ? '🦆' : item.ast.entity === 'boss' ? '🐱' :
        item.ast.collision === 'shield' ? '🛡' : '✦';
      const id = document.createElement('span');
      id.className = 'cart__id';
      id.textContent = `CF-${String(index + 1).padStart(3, '0')}`;
      const status = document.createElement('span');
      status.className = 'cart__stat';
      status.textContent = 'SAFE AST';
      top.append(icon, id, status);
      const title = document.createElement('h3');
      title.textContent = item.name;
      const idea = document.createElement('p');
      idea.className = 'cart__idea';
      idea.textContent = `${item.ast.entity} · ${item.ast.collision} · ${item.ast.duration}s`;
      const tags = document.createElement('div');
      tags.className = 'cart__tags';
      for (const tag of item.ast.tags) {
        const label = document.createElement('span');
        label.textContent = tag.toUpperCase();
        tags.append(label);
      }
      const footer = document.createElement('div');
      footer.className = 'cart__foot';
      const author = document.createElement('span');
      author.className = 'cart__by';
      author.textContent = index < builtins.length ? 'BUILT-IN' : 'SAVED';
      const play = document.createElement('span');
      play.className = 'cart__play';
      play.textContent = 'DEPLOY ▶';
      footer.append(author, play);
      card.append(top, title, idea, tags, footer);
      card.addEventListener('click', () => onDeploy(item.ast));
      container.append(card);
    }
    document.getElementById('cartCount').textContent = builtins.length + saved.length;
  }
  function save(name, ast) {
    if (!validateAst(ast)) return;
    saved.unshift({ name: name.slice(0, 80), ast });
    saved = saved.slice(0, 30);
    try { localStorage.setItem(STORAGE, JSON.stringify(saved)); } catch { /* Storage may be unavailable. */ }
    render();
  }
  render();
  return { save };
}
