import React, { useState } from 'react';
import DocumentationLayout from '../../components/DocumentationLayout/DocumentationLayout';
import { AffiliateDisclosure } from '../../components/AffiliateDisclosure/AffiliateDisclosure';
import { ProductImage } from '../../components/ProductImage/ProductImage';
import { products, getCategoryName, Product } from '../../data/products';

const ProductsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all'>('all');

  const categories: Array<Product['category'] | 'all'> = [
    'all',
    'base',
    'expansion',
    'bundle',
    'mini',
    'special',
    'storage'
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <DocumentationLayout title="Shop Products">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Official Cards Against Humanity Products
          </h1>
          <p className="text-lg text-gray-600">
            Browse the full collection of Cards Against Humanity games, expansions, and accessories.
            Available on Amazon.
          </p>
        </div>

        {/* Affiliate Disclosure */}
        <AffiliateDisclosure className="mb-8" />

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Products' : getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
            >
              {/* Product Image */}
              <div className="aspect-square w-full overflow-hidden bg-gray-50">
                <ProductImage
                  product={product}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded">
                    {getCategoryName(product.category)}
                  </span>
                  {product.featured && (
                    <span className="inline-block ml-2 px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>

                {product.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:underline">
                  View on Amazon
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}

        {/* Additional Support Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Love This Free Game?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              This project is completely free and open source. If you enjoy playing,
              consider supporting the development with a coffee!
            </p>
            <a
              href="https://buymeacoffee.com/keif"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
              </svg>
              Buy Me a Coffee
            </a>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default ProductsScreen;
