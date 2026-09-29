/* Load the page scripts after shared browser storage is ready. */
(function () {
  const page = document.currentScript?.dataset.page;
  const versions = {
    index: '20260951',
    shop: '20260942',
    product: '20260948',
    cart: '20260919',
  checkout: '2026092802',
    contact: '20260924'
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
    .then(() => load('assets/js/navigation.js?v=20260932'))
    .then(() => Promise.all([
      load('assets/js/brand.js?v=20260927c'),
      load('assets/js/site-header.js?v=10')
    ]))
    .catch(() => {});
})();
