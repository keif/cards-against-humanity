# Products Data

This directory contains affiliate product links for Cards Against Humanity products.

## Product Images

Product images are stored in `/public/images/products/`. See `/public/images/products/README.md` for detailed guidelines on adding product images.

The `ProductImage` component automatically displays a Cards Against Humanity themed placeholder for products without images, so the site works perfectly even before adding images.

## Adding New Products

To add new products manually, edit `products.ts` and add a new entry to the `products` array:

```typescript
{
  id: 'unique-product-id',
  title: 'Product Title',
  url: 'https://amzn.to/xxxxx',
  category: 'base' | 'expansion' | 'bundle' | 'mini' | 'special' | 'storage',
  featured?: true, // Optional: Shows in footer and gets special badge
  description?: 'Product description'
}
```

## Automating Product Updates (Future Enhancement)

To automate fetching new products from Amazon, you would need to:

### Option 1: Amazon Product Advertising API
1. Apply for Amazon Product Advertising API access
2. Get API credentials (Access Key, Secret Key)
3. Create a backend service to:
   - Periodically fetch product data
   - Cache results in Redis or database
   - Serve to frontend via API endpoint
4. Update frontend to fetch from API instead of static file

### Option 2: Web Scraping (Not Recommended)
- Against Amazon's Terms of Service
- Fragile and breaks with page changes
- May result in IP blocks

### Option 3: Manual Curation (Current Approach)
- Simple, reliable, no API limits
- Full control over what products are shown
- Easy to maintain and update
- Recommended for small product catalogs

For now, manual curation is the recommended approach given the relatively small number of products.
