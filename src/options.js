(async () => {
  'use strict';

  const textUrl = document.getElementById('url')
  textUrl.value = (await browser.storage.local.get('url'))?.url || '';
  console.log(await browser.storage.local.get('url'));

  let timer = 0;
  textUrl.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      browser.storage.local.set({ url: textUrl.value });
    }, 100);
  });

})();

