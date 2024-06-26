(async () => {
  'use strict';

  const bindings = document.getElementsByClassName('js-bind');

  for (const binding of bindings) {
    const s = (await browser.storage.local.get(binding.id))
    if (binding.type === 'checkbox') {
      binding.checked = !!s[binding.id];
    } else {
      binding.value = s && s[binding.id] || binding.getAttribute('data-default');
    }
  }

  let timer = 0;
  addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const data = {};
      for (const binding of bindings) {
        data[binding.id] = binding.type === 'checkbox' ? binding.checked : binding.value;
      }
      browser.storage.local.set(data);
    }, 300);
  });

})();

