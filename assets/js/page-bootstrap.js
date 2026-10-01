/* Load the page scripts after shared browser storage is ready. */
(function () {
  try {
    if (!localStorage.getItem('sanadLanguageInitialized')) {
      localStorage.setItem('lang', 'en');
      localStorage.setItem('sanadLanguageInitialized', '1');
    }
  } catch {}
  const page = document.currentScript?.dataset.page;
  const versions = {
    index: '20260954',
    shop: '20260945',
    product: '20261001',
    cart: '20260931',
    checkout: '20261001',
    contact: '20260925'
  };
  if (!page || !versions[page]) return;
  const load = source => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = source;
    script.onload = resolve;
    script.onerror = reject;
    document.body.append(script);
  });
  load(`assets/js/${page}.js?v=${versions[page]}`)
    .then(() => load('assets/js/navigation.js?v=20260935'))
    .then(() => Promise.all([
      load('assets/js/brand.js?v=20260927c'),
      load('assets/js/site-header.js?v=13')
    ]))
    .catch(() => {});
})();
