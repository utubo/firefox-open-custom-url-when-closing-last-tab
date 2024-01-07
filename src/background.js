'use strict';

browser.tabs.onRemoved.addListener(async (_tabId, _removeInfo) => {
  setTimeout(async () => {
    const url = (await browser.storage.local.get('url'))?.url;
    if (!url) return;
    const current = (await browser.tabs.query({ active: true }))[0];
    if (current) return;
    browser.tabs.create({ url: url });
  }, 200);
});

