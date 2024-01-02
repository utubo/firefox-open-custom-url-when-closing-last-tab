'use strict';

browser.tabs.onRemoved.addListener(async (_tabId, _removeInfo) => {
  setTimeout(async () => {
    const url = (await browser.storage.local.get('url'))?.url;
    if (!url) return;
    const current = (await browser.tabs.query({ active: true }))[0];
    if (current && current.url && current.url !== 'about:blank') return;
    try {
      if (current) {
        await browser.tabs.update({ url: url });
        return;
      }
    } catch (e) {
       console.log(e);
    }
    browser.tabs.create({ url: url });
  }, 100);
});

