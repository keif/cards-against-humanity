import React, { useState } from 'react';
import { Product } from '../../data/products';

interface ProductImageProps {
  product: Product;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ product, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  // Use product image if available, otherwise show placeholder
  const shouldShowPlaceholder = !product.image || imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  if (shouldShowPlaceholder) {
    return (
      <div
        className={`bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center ${className}`}
      >
        <div className="text-center p-6">
          {/* Cards Against Humanity style logo/icon */}
          <div className="mb-3">
            <svg
              className="w-16 h-16 mx-auto text-white opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
            </svg>
          </div>
          <div className="text-white text-xs font-bold uppercase tracking-wide">
            Cards Against
          </div>
          <div className="text-white text-xs font-bold uppercase tracking-wide">
            Humanity
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.title}
      className={className}
      onError={handleImageError}
      loading="lazy"
    />
  );
};
