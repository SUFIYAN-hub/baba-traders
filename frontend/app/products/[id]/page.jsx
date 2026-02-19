'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(params.id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-900 border-t-yellow-400 
                        rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">😞</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-900 text-white px-8 py-3 rounded-full font-semibold
                     hover:bg-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105
                     transition-all duration-300">
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  const price = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0;
  const discount = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;
  const savings = hasDiscount ? product.price - product.discountPrice : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-900 transition-colors">Home</a>
            <span>›</span>
            <a href="/products" className="hover:text-blue-900 transition-colors">Products</a>
            <span>›</span>
            <span className="text-blue-900 font-semibold truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden aspect-square
                          border-4 border-gray-100">
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500
                              text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
                  {discount}% OFF
                </div>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-white
                              px-4 py-2 rounded-full font-bold shadow-lg">
                  Only {product.stock} left!
                </div>
              )}
              <img
                src={product.images?.[selectedImage] || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 border-3 rounded-lg overflow-hidden
                              transition-all duration-300 hover:scale-105
                              ${selectedImage === idx 
                                ? 'border-blue-900 shadow-lg ring-2 ring-blue-900' 
                                : 'border-gray-300 hover:border-blue-500'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full
                             text-sm font-bold">
                {product.category?.name}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.ratings?.average > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${
                      i < Math.round(product.ratings.average) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 font-semibold">
                  {product.ratings.average.toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({product.ratings.count} reviews)
                </span>
              </div>
            )}

            {/* Price Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl md:text-5xl font-bold text-blue-900">
                  ₹{price}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full
                                   text-sm font-bold">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              
              {hasDiscount && (
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <span className="text-2xl">💰</span>
                  <span>You save ₹{savings}!</span>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <span>✓</span> Inclusive of all taxes
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              {product.stock > 0 ? (
                <>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <span className="text-2xl">✅</span>
                    <span>In Stock ({product.stock} available)</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-red-600 font-semibold">
                  <span className="text-2xl">❌</span>
                  <span>Out of Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Product Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <label className="block font-bold text-gray-900 mb-3 text-lg">
                  Quantity:
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 border-gray-300 rounded-xl font-bold text-xl
                             hover:bg-gray-100 hover:border-blue-900 transition-all">
                    −
                  </button>
                  <span className="text-2xl font-bold w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 border-2 border-gray-300 rounded-xl font-bold text-xl
                             hover:bg-gray-100 hover:border-blue-900 transition-all">
                    +
                  </button>
                  <span className="text-gray-600 text-sm">
                    (Max: {product.stock})
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {addedToCart && (
                <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3
                              rounded-xl text-center font-semibold animate-pulse">
                  ✅ Added to cart successfully!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-4 rounded-xl
                           font-bold text-lg hover:from-blue-800 hover:to-blue-600
                           shadow-lg hover:shadow-xl transform hover:scale-105
                           transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:hover:scale-100 disabled:hover:shadow-lg
                           flex items-center justify-center gap-2">
                  {product.stock === 0 ? (
                    <span>Out of Stock</span>
                  ) : (
                    <>
                      <span>Add to Cart</span>
                      <span>🛒</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 py-4 rounded-xl
                           font-bold text-lg hover:from-yellow-500 hover:to-yellow-600
                           shadow-lg hover:shadow-xl transform hover:scale-105
                           transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:hover:scale-100 disabled:hover:shadow-lg
                           flex items-center justify-center gap-2">
                  {product.stock === 0 ? (
                    <span>Unavailable</span>
                  ) : (
                    <>
                      <span>Buy Now</span>
                      <span>⚡</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🚚</div>
                <p className="text-xs font-semibold text-gray-700">Free Delivery</p>
                <p className="text-xs text-gray-500">In Pandharpur</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">💳</div>
                <p className="text-xs font-semibold text-gray-700">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay at doorstep</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="text-xs font-semibold text-gray-700">100% Authentic</p>
                <p className="text-xs text-gray-500">Genuine products</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🔄</div>
                <p className="text-xs font-semibold text-gray-700">Easy Returns</p>
                <p className="text-xs text-gray-500">7-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}