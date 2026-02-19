'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const price = product.price;
  const discountPrice = product.discountPrice;
  const hasDiscount = discountPrice > 0;
  const discount = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    // Visual feedback
    const button = e.currentTarget;
    button.classList.add('scale-90');
    setTimeout(() => button.classList.remove('scale-90'), 200);
  };

  return (
    <Link href={`/products/${product._id}`}>
      <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl 
                      transition-all duration-500 overflow-hidden
                      transform hover:-translate-y-2 cursor-pointer">

        {/* Product Image Container */}
        <div className="relative h-56 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          
          {/* Image Skeleton Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}

          {/* Product Image */}
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transform group-hover:scale-110 
                       transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white 
                            px-3 py-1 rounded-full text-xs font-bold shadow-lg
                            animate-pulse">
                {discount}% OFF
              </div>
            </div>
          )}

          {/* Stock Badge */}
          {product.stock === 0 ? (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
              <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl">
                Out of Stock
              </div>
            </div>
          ) : product.stock <= 5 && (
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Only {product.stock} left!
              </div>
            </div>
          )}

          {/* Quick View Button (appears on hover) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10
                          opacity-0 group-hover:opacity-100 transform translate-y-4 
                          group-hover:translate-y-0 transition-all duration-300">
            <span className="bg-white text-blue-900 px-4 py-2 rounded-full text-sm font-semibold
                           shadow-lg hover:bg-yellow-400 transition-colors">
              Quick View 👁️
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category Badge */}
          <div className="mb-2">
            <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 
                           px-2 py-1 rounded-full">
              {product.category?.name || 'Product'}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-gray-900 hover:text-blue-900 
                         transition-colors line-clamp-2 mb-2 text-base sm:text-lg
                         group-hover:text-blue-600">
            {product.name}
          </h3>

          {/* Rating (if available) */}
          {product.ratings?.average > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.round(product.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.ratings.count})
              </span>
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-900 font-bold text-xl sm:text-2xl">
              ₹{hasDiscount ? discountPrice : price}
            </span>
            {hasDiscount && (
              <span className="text-gray-400 text-sm line-through">
                ₹{price}
              </span>
            )}
          </div>

          {/* Savings Badge */}
          {hasDiscount && (
            <div className="mb-3">
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                Save ₹{price - discountPrice}
              </span>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 rounded-xl
                     font-semibold text-sm sm:text-base
                     hover:from-yellow-400 hover:to-yellow-500 hover:text-blue-900
                     shadow-md hover:shadow-lg
                     transform transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:from-blue-900 disabled:hover:to-blue-700
                     flex items-center justify-center gap-2
                     group/btn">
            {product.stock === 0 ? (
              <>
                <span>Out of Stock</span>
              </>
            ) : (
              <>
                <span>Add to Cart</span>
                <span className="transform group-hover/btn:translate-x-1 transition-transform">
                  🛒
                </span>
              </>
            )}
          </button>
        </div>

        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                      transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </Link>
  );
}