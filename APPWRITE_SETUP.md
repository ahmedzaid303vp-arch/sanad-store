# Appwrite setup — SANAD

The storefront is connected to Appwrite for its product catalogue. It uses only public connection identifiers in the browser; no API key is stored in the website.

## Current SANAD resources

- Endpoint: `https://fra.cloud.appwrite.io/v1`
- Project ID: `6ab8d2eb003cb78f3a2d`
- Database: `SANAD Store` — ID `6ab8d3330025f46e8b0c`
- Products table: `products` — ID `6ab8d3500033eaeace4f`
- Product images bucket: `products-media` — ID `6ab8d3dd00049275dc51`
- Orders table: `orders` — ID `6ab99f74003c7d1357a3`
- Order processor Function: `SANAD Order Processor` — ID `6ab9a405001a1d3f7649`

Visitors can read products and product images. They cannot create, modify, or delete either resource.

Orders are private. At checkout, the website sends the cart and shipping details to the Function; the Function reads the real product data, validates availability and selected options, calculates the total itself, then writes the order to the private `orders` table. Visitors cannot read order or customer data.

## Do not put secrets in the website

The website may contain only the Appwrite endpoint and project ID. Never place an API key, server key, or database admin credential in `assets/js/` or an HTML file.

## Add a product

In the `products` table, create a row with:

- `title_ar`: Arabic product name.
- `data`: the following JSON, with your own values. The `id` must be a unique number.

```json
{
  "id": 101,
  "en": "Classic Leather Watch",
  "cat": "watches",
  "price": 1500,
  "old": 1800,
  "badge": "new",
  "stock": true,
  "colors": ["#1b1b1b", "#6b4a2f"],
  "images": ["https://fra.cloud.appwrite.io/v1/storage/buckets/BUCKET_ID/files/FILE_ID/view?project=PROJECT_ID"],
  "variants": [
    {
      "id": "black",
      "label": "أسود",
      "image": "https://fra.cloud.appwrite.io/v1/storage/buckets/BUCKET_ID/files/FILE_ID/view?project=PROJECT_ID"
    }
  ]
}
```

Upload product photos into `products-media`, copy each photo's View URL, and put it in `images` or `variants[].image`. On the next visit or refresh, the website automatically loads the latest products from Appwrite.

## Before publishing

- Add your real website domain to the SANAD Web app in Appwrite. `localhost` is already registered for local testing.
- Add your actual products to the `products` table before accepting orders. The Function refuses products that do not exist or are not available in Appwrite.
- Keep the `orders` table private. It is intentionally written only by the Function, which has the minimum two database scopes: `rows.read` and `rows.write`.

## Current website connection

The storefront already loads its catalogue directly from Appwrite using the project endpoint and public project ID. Product data is cached in the visitor's browser for a fast next page load; it contains no API key or admin credential.
