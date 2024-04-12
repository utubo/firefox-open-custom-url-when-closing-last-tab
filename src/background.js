'use strict';

let timer = null;

// -------------------
// Open the custom url
// -------------------

const main = async () => {
  const tabs = await browser.tabs.query({ active: true });
  if (tabs[0]) return;
  const url = (await browser.storage.local.get('url'))?.url;
  if (!url) return;
  browser.tabs.create({ url: url });
};

browser.tabs.onRemoved.addListener(async () => {
  clearTimeout(timer);
  const delay = (await browser.storage.local.get('delay'))?.delay;
  timer = setTimeout(main, Number(delay) || 500);
});

// -------------------
// Replace about:blank
// -------------------

const replace = async () => {
  const tabs = await browser.tabs.query({ active: true, status: 'complete', url: 'about:blank' });
  if (!tabs[0]) return;
  const url = (await browser.storage.local.get('url'))?.url;
  if (!url) return;
  browser.tabs.update(tabs[0].id, { url: url });
};

browser.tabs.onCreated.addListener(async () => {
  const settings = await browser.storage.local.get(['delay', 'replace']);
  if (!settings.replace) return;
  clearTimeout(timer);
  timer = setTimeout(replace, Number(settings.delay) || 500);
});

