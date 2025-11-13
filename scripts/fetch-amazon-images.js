#!/usr/bin/env node

/**
 * Automated Amazon Product Image Fetcher
 *
 * This script attempts to fetch product images from Amazon by:
 * 1. Following the affiliate URL to get the actual Amazon product page
 * 2. Fetching the page HTML
 * 3. Extracting the main product image URL
 * 4. Downloading the image to the local directory
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PRODUCTS_DIR = path.join(__dirname, '..', 'client', 'public', 'images', 'products');
const DELAY_MS = 2000; // Delay between requests to be respectful

// Products with their affiliate URLs
const products = [
  { id: 'base-game', url: 'https://amzn.to/47T7TiE' },
  { id: 'more-cards', url: 'https://amzn.to/488f6g5' },
  { id: 'nasty-bundle', url: 'https://amzn.to/4r09xba' },
  { id: 'ultimate-expansion', url: 'https://amzn.to/4hREt9e' },
  { id: 'hot-box', url: 'https://amzn.to/4hYAacn' },
  { id: 'family-edition', url: 'https://amzn.to/49LMcn9' },
  { id: 'everything-box', url: 'https://amzn.to/49gBaq4' },
  { id: 'hidden-gems-bundle', url: 'https://amzn.to/489Q2Fu' },
  { id: 'pop-culture-bundle', url: 'https://amzn.to/4nPDLe8' },
  { id: 'nerd-bundle', url: 'https://amzn.to/4i5hp75' },
  { id: 'out-of-line', url: 'https://amzn.to/49f69CJ' },
  { id: 'canadian-edition', url: 'https://amzn.to/49OqizL' },
  { id: '2000s-nostalgia', url: 'https://amzn.to/49PBXyd' },
  { id: 'tiny-edition', url: 'https://amzn.to/3WQS5Ik' },
  { id: 'tales-vol-1', url: 'https://amzn.to/47RwWm6' },
  { id: 'jew-pack', url: 'https://amzn.to/47Rxqce' },
  { id: '90s-nostalgia', url: 'https://amzn.to/4oZ7IJA' },
  { id: 'ass-pack', url: 'https://amzn.to/4hVkMxr' },
  { id: 'weed-pack', url: 'https://amzn.to/4nS5r1Q' },
  { id: 'saves-america', url: 'https://amzn.to/4r2qjGH' },
  { id: 'food-pack', url: 'https://amzn.to/3Jvs4vb' },
  { id: 'family-glow', url: 'https://amzn.to/47QF4n7' },
  { id: 'period-pack', url: 'https://amzn.to/4hWqJdw' },
  { id: 'boks-storage', url: 'https://amzn.to/47PbcaG' },
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    };

    protocol.get(url, options, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, finalUrl: url }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractImageUrl(html) {
  // Try multiple patterns to find the main product image
  const patterns = [
    /"largeImage":"([^"]+)"/,
    /"hiRes":"([^"]+)"/,
    /data-old-hires="([^"]+)"/,
    /data-a-dynamic-image="([^"]+)"/,
    /"colorImages":\{"initial":\[\{"large":"([^"]+)"/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      // Unescape the URL
      let imageUrl = match[1].replace(/\\u002F/g, '/').replace(/\\/g, '');
      // Remove size parameters to get full resolution
      imageUrl = imageUrl.replace(/_[A-Z]{2}[0-9]+_/, '_SL1500_');
      return imageUrl;
    }
  }

  return null;
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function processProduct(product, index, total) {
  console.log(`\n[${index + 1}/${total}] Processing: ${product.id}`);
  console.log(`URL: ${product.url}`);

  try {
    // Fetch the page
    const { html } = await fetchPage(product.url);

    // Extract image URL
    const imageUrl = extractImageUrl(html);
    if (!imageUrl) {
      console.log(`❌ Could not find image URL for ${product.id}`);
      return { id: product.id, success: false, reason: 'Image URL not found' };
    }

    console.log(`Found image: ${imageUrl.substring(0, 80)}...`);

    // Download the image
    const filepath = path.join(PRODUCTS_DIR, `${product.id}.jpg`);
    await downloadImage(imageUrl, filepath);

    console.log(`✅ Downloaded: ${filepath}`);
    return { id: product.id, success: true, path: filepath };

  } catch (error) {
    console.log(`❌ Error processing ${product.id}: ${error.message}`);
    return { id: product.id, success: false, reason: error.message };
  }
}

async function main() {
  console.log('Amazon Product Image Fetcher');
  console.log('============================\n');

  // Ensure directory exists
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }

  const results = [];

  for (let i = 0; i < products.length; i++) {
    const result = await processProduct(products[i], i, products.length);
    results.push(result);

    // Add delay between requests
    if (i < products.length - 1) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }

  // Print summary
  console.log('\n\nSummary');
  console.log('=======');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);

  if (failed > 0) {
    console.log('\nFailed products:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.id}: ${r.reason}`);
    });
  }

  console.log('\nNext steps:');
  console.log('1. Review downloaded images in:', PRODUCTS_DIR);
  console.log('2. Run: node scripts/update-product-data.js');
}

main().catch(console.error);
