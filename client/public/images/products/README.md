# Product Images

Place product images in this directory with filenames matching the product IDs in `src/data/products.ts`.

## Image Guidelines

### File Naming
- Use the product ID from `products.ts` as the filename
- Format: `{product-id}.jpg` or `{product-id}.png`
- Examples:
  - `base-game.jpg`
  - `hot-box.png`
  - `storage-case.jpg`

### Image Specifications
- **Aspect Ratio**: 1:1 (square) or 3:4 (portrait) recommended
- **Dimensions**: Minimum 400x400px, recommended 800x800px
- **Format**: JPG or PNG (JPG preferred for smaller file size)
- **File Size**: Keep under 200KB per image for fast loading
- **Background**: White or transparent background preferred

### How to Obtain Images

#### Option 1: Screenshots from Amazon
1. Visit the product page on Amazon
2. Take a screenshot of the main product image
3. Crop to square aspect ratio
4. Save as `{product-id}.jpg`

#### Option 2: Official Cards Against Humanity
- Download official product images from cardsagainsthumanity.com
- Respect copyright and usage guidelines

#### Option 3: Amazon Product Advertising API
- If you have API access, fetch product images programmatically
- Cache images locally for better performance

### Adding Images to Products

After adding an image file, update the product entry in `src/data/products.ts`:

```typescript
{
  id: 'base-game',
  title: 'Cards Against Humanity',
  url: 'https://amzn.to/47T7TiE',
  image: '/images/products/base-game.jpg', // Add this line
  category: 'base',
  // ... rest of product data
}
```

### Placeholder Image

If no image is specified, the ProductImage component will display a Cards Against Humanity themed placeholder.
