'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-2xl text-gray-400 mb-4">Product not found 😞</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg">
          Back to Products
        </button>
      </div>
    );
  }

  const price = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0;
  const discount = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity}x ${product.name} added to cart! 🛒`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-blue-900">Home</a> 
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-blue-900">Products</a>
        <span className="mx-2">/</span>
        <span className="text-blue-900 font-semibold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Images Section */}
        <div>
          {/* Main Image */}
          <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 
                          aspect-square flex items-center justify-center">
            <img
              src={product.images?.[selectedImage] || '/placeholder.png'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden
                    ${selectedImage === idx ? 'border-blue-900' : 'border-gray-300'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {product.name}
          </h1>

          <p className="text-gray-500 text-sm mb-4">
            Category: <span className="font-semibold">{product.category?.name}</span>
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-blue-900">
              ₹{price}
            </span>
            {hasDiscount && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.price}
                </span>
                <span className="bg-red-500 text-white text-sm font-bold 
                                 px-2 py-1 rounded-full">
                  -{discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold">
                ✅ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 font-semibold">
                ❌ Out of Stock
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Description:</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block font-semibold text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg 
                             hover:bg-gray-100 font-bold">
                  −
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg 
                             hover:bg-gray-100 font-bold">
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-900 text-white py-3 rounded-lg 
                         font-semibold text-lg hover:bg-yellow-400 
                         hover:text-blue-900 transition disabled:opacity-50 
                         disabled:cursor-not-allowed">
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart 🛒'}
            </button>
            <button
              onClick={() => {
                addToCart(product, quantity);
                router.push('/cart');
              }}
              disabled={product.stock === 0}
              className="flex-1 bg-yellow-400 text-blue-900 py-3 rounded-lg 
                         font-semibold text-lg hover:bg-yellow-300 
                         transition disabled:opacity-50 disabled:cursor-not-allowed">
              Buy Now ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}