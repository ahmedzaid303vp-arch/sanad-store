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

  const categoryAliases = Object.freeze({
    'ساعات': 'watches', watches: 'watches',
    'نظارات': 'glasses', glasses: 'glasses',
    'عطور': 'perfumes', perfumes: 'perfumes',
    'محافظ': 'wallets', wallets: 'wallets',
    'حوافظ كروت': 'cardholders', cardholders: 'cardholders',
    'شنط يد': 'handbags', handbags: 'handbags',
    'شنط كروس': 'crossbags', crossbags: 'crossbags',
    'أحزمة': 'belts', belts: 'belts',
    'حريمي': 'women', women: 'women',
    'منظمات': 'organizers', organizers: 'organizers'
  });
  const list = value => String(value || '').split(/[,،\n]/).map(item => item.trim()).filter(Boolean);
  const imageUrl = value => {
    if (/^https:\/\//i.test(value)) return value;
    return /^[A-Za-z0-9_-]{8,64}$/.test(value)
      ? `${config.endpoint}/storage/buckets/${config.productImagesBucketId}/files/${value}/view?project=${config.projectId}`
      : '';
  };
  const parseSimpleRow = row => {
    const category = categoryAliases[String(row.category || '').trim().toLowerCase()];
    const images = list(row.image_files).map(imageUrl).filter(Boolean);
    const colors = list(row.colors);
    if (!row.title_ar || !row.name_en || !category || !row.price || !images.length) return null;
    return SanadSafety.product({
      id: Number(row.$sequence),
      ar: row.title_ar,
      en: row.name_en,
      cat: category,
      price: Number(row.price),
      stock: !/^(?:غير متاح|نفد|out of stock)$/i.test(String(row.status || '').trim()),
      images,
      variants: colors.map((label, index) => ({ id: `color-${index + 1}`, label, image: images[index] })).filter(item => item.image)
    });
  };
  const parseRow = row => {
    try {
      const details = JSON.parse(row.data || '');
      const legacy = SanadSafety.product({ ...details, ar: row.title_ar });
      if (legacy) return legacy;
    } catch {}
    return parseSimpleRow(row);
  };
  window.SanadAppwrite = Object.freeze({ config, cachedProducts });
  if (!window.SanadSafety) return;

  const refreshProducts = () => {
    if (navigator.onLine === false) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3500);
    fetch(`${config.endpoint}/tablesdb/${config.databaseId}/tables/${config.productsTableId}/rows`, {
      headers: { 'X-Appwrite-Project': config.projectId },
      signal: controller.signal
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
      .catch(() => {})
      .finally(() => window.clearTimeout(timeout));
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(refreshProducts, { timeout: 900 });
  else window.setTimeout(refreshProducts, 0);
})();
