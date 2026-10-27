export function wireCrowdTabs() {
  function selectTab(button) {
    for (const tab of document.querySelectorAll('.crowd-tab')) {
      const selected = tab === button;
      tab.classList.toggle('is-on', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
    for (const panel of document.querySelectorAll('.crowd-panel')) {
      panel.hidden = panel.dataset.panel !== button.dataset.tab;
    }
  }
  for (const button of document.querySelectorAll('.crowd-tab')) {
    button.addEventListener('click', () => selectTab(button));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const next = button.dataset.tab === 'sim'
        ? document.querySelector('[data-tab="live"]')
        : document.querySelector('[data-tab="sim"]');
      selectTab(next);
      next.focus();
    });
  }
}
