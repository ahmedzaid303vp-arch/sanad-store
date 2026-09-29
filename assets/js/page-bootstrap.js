/* Load the page scripts after shared browser storage is ready. */
(function () {
  const page = document.currentScript?.dataset.page;
  const versions = {
    index: '20260952',
    shop: '20260943',
    product: '20260949',
    cart: '20260920',
    checkout: '2026092803',
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
    .then(() => load('assets/js/navigation.js?v=20260934'))
    .then(() => Promise.all([
      load('assets/js/brand.js?v=20260927c'),
      load('assets/js/site-header.js?v=10')
    ]))
    .catch(() => {});
})();
