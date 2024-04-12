'use strict';

const main = async () => {
  const tabs = await browser.tabs.query({ active: true });
  if (tabs[0]) return;
  // open custom url
  const url = (await browser.storage.local.get('url'))?.url;
  if (url) {
    browser.tabs.create({ url: url });
  }
};

let timer = null;
browser.tabs.onRemoved.addListener(async () => {
  clearTimeout(timer);
  const delay = (await browser.storage.local.get('delay'))?.delay;
  timer = setTimeout(main, Number(delay) || 500);
});

