const { Client, ID, TablesDB } = require('node-appwrite');

const databaseId = '6ab8d3330025f46e8b0c';
const productsTableId = '6ab8d3500033eaeace4f';
const ordersTableId = '6ab99f74003c7d1357a3';
const maximumItems = 15;

const cleanText = (value, limit) => String(value ?? '')
  .replace(/[\u0000-\u001F\u007F]/g, '')
  .trim()
  .slice(0, limit);

const quantity = value => {
  const number = Number(value);
  return Number.isInteger(number) && number >= 1 && number <= 20 ? number : null;
};

module.exports = async ({ req, res, error }) => {
  if (req.method !== 'POST') return res.json({ ok: false, error: 'Method not allowed' }, 405);

  const input = req.bodyJson;
  const customer = input?.info && typeof input.info === 'object' ? input.info : {};
  const name = cleanText(customer.name, 120);
  const phone = cleanText(customer.phone, 20);
  const governorate = cleanText(customer.gov, 80);
  const city = cleanText(customer.city, 100);
  const address = cleanText(customer.addr, 300);
  const notes = cleanText(customer.notes, 500);

  if (!name || !/^\d{11}$/.test(phone) || !governorate || !city || !address) {
    return res.json({ ok: false, error: 'Invalid customer details' }, 400);
  }

  const cart = Array.isArray(input?.items) ? input.items.slice(0, maximumItems) : [];
  if (!cart.length) return res.json({ ok: false, error: 'Cart is empty' }, 400);

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);
  const tablesDB = new TablesDB(client);

  try {
    const result = await tablesDB.listRows({ databaseId, tableId: productsTableId });
    const products = new Map(result.rows.map(row => {
      try {
        const data = JSON.parse(row.data || '{}');
        return [Number(data.id), { ...data, ar: row.title_ar }];
      } catch {
        return [null, null];
      }
    }).filter(([id, product]) => Number.isInteger(id) && product));

    let subtotal = 0;
    const items = [];
    for (const item of cart) {
      const product = products.get(Number(item?.id));
      const count = quantity(item?.q);
      if (!product || product.stock === false || !count || !Number.isFinite(Number(product.price))) {
        return res.json({ ok: false, error: 'One of the products is unavailable' }, 400);
      }

      const variantId = cleanText(item?.variant, 60);
      const variant = Array.isArray(product.variants)
        ? product.variants.find(value => value?.id === variantId)
        : null;
      if (variantId && !variant) return res.json({ ok: false, error: 'Invalid product option' }, 400);

      const price = Math.round(Number(product.price) * 100) / 100;
      subtotal += price * count;
      items.push({
        productId: Number(product.id),
        title: cleanText(product.ar, 160),
        quantity: count,
        price,
        variant: variant ? cleanText(variant.label || variant.id, 60) : ''
      });
    }

    const shipping = subtotal >= 2000 ? 0 : 50;
    const order = {
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      customer: { name, phone, governorate, city, address, notes },
      items,
      subtotal: Math.round(subtotal * 100) / 100,
      shipping,
      total: Math.round((subtotal + shipping) * 100) / 100
    };

    const row = await tablesDB.createRow({
      databaseId,
      tableId: ordersTableId,
      rowId: ID.unique(),
      data: { data: JSON.stringify(order) }
    });
    return res.json({ ok: true, orderId: row.$id, orderNumber: order.orderNumber });
  } catch (cause) {
    error(`Order processing failed: ${cause?.message || 'Unknown error'}`);
    return res.json({ ok: false, error: 'Unable to place the order' }, 500);
  }
};
