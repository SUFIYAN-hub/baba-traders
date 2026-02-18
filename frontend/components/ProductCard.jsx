'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const price        = product.price;
  const discountPrice = product.discountPrice;
  const hasDiscount  = discountPrice > 0;
  const discount     = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl 
                    transition-all duration-300 overflow-hidden group">

      {/* Product Image */}
      <Link href={`/products/${product._id}`}>
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          <img
            src={product.images?.[0] || '/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover 
                       group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white 
                             text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 
                            flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-blue-900 
                         transition truncate">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 mt-1">
          {product.category?.name}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-blue-900 font-bold text-lg">
            ₹{hasDiscount ? discountPrice : price}
          </span>
          {hasDiscount && (
            <span className="text-gray-400 text-sm line-through">
              ₹{price}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="mt-3 w-full bg-blue-900 text-white py-2 rounded-lg
                     hover:bg-yellow-400 hover:text-blue-900 font-semibold
                     transition-all duration-200 disabled:opacity-50
                     disabled:cursor-not-allowed text-sm">
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart 🛒'}
        </button>
      </div>
    </div>
  );
}