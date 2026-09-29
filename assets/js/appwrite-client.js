/* Public Appwrite connection for the storefront. It intentionally contains no API key. */
(function () {
  const config = Object.freeze({
    endpoint: 'https://fra.cloud.appwrite.io/v1',
    projectId: '6ab8d2eb003cb78f3a2d',
    databaseId: '6ab8d3330025f46e8b0c',
    productsTableId: '6ab8d3500033eaeace4f',
    productImagesBucketId: '6ab8d3dd00049275dc51',
    ordersFunctionId: '6ab9a405001a1d3f7649',
    ordersExecutionsUrl: 'https://fra.cloud.appwrite.io/v1/functions/6ab9a405001a1d3f7649/executions'
  });
  const cacheKey = 'sanadAppwriteProducts';
  const reloadKey = 'sanadAppwriteReload';
  const readCache = () => {
    try {
      const value = JSON.parse(localStorage.getItem(cacheKey) || '[]');
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  };
  const cachedProducts = readCache();

  const parseRow = row => {
    try {
      const details = JSON.parse(row.data || '{}');
      return SanadSafety.product({ ...details, ar: row.title_ar });
    } catch { return null; }
  };
  window.SanadAppwrite = Object.freeze({ config, cachedProducts });
  if (!window.SanadSafety) return;

  fetch(`${config.endpoint}/tablesdb/${config.databaseId}/tables/${config.productsTableId}/rows`, {
    headers: { 'X-Appwrite-Project': config.projectId }
  })
    .then(response => response.ok ? response.json() : Promise.reject(new Error('Unable to load products')))
    .then(result => (Array.isArray(result.rows) ? result.rows : []).map(parseRow).filter(Boolean))
    .then(products => {
      if (!products.length) return;
      const next = JSON.stringify(products);
      const previous = JSON.stringify(cachedProducts);
      if (next === previous) return;
      localStorage.setItem(cacheKey, next);
      if (sessionStorage.getItem(reloadKey) !== next) {
        sessionStorage.setItem(reloadKey, next);
        window.location.reload();
      }
    })
    .catch(() => {});
})();
