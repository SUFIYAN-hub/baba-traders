'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/api';

const categoryIcons = {
  watches: '⌚', belts: '👔', clocks: '🕐',
  kitchen: '🍳', goggles: '🕶️', wallets: '👛'
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories]             = useState([]);
  const [loading, setLoading]                   = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          getProducts('?featured=true'),
          getCategories()
        ]);
        setFeaturedProducts(products);
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-yellow-400">Baba Traders</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-xl">
            Pandharpur's most trusted shop — now online! 
            Shop watches, belts, clocks, kitchen items & more.
          </p>
          <div className="flex gap-4">
            <Link href="/products"
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full
                         font-bold hover:bg-yellow-300 transition text-lg">
              Shop Now
            </Link>
            <Link href="/register"
              className="border-2 border-white px-8 py-3 rounded-full
                         font-bold hover:bg-white hover:text-blue-900 transition text-lg">
              Join Us
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat._id}
              href={`/products?category=${cat._id}`}
              className="flex flex-col items-center bg-white rounded-xl p-4
                         shadow hover:shadow-lg hover:-translate-y-1
                         transition-all duration-200 group">
              <span className="text-4xl mb-2">
                {categoryIcons[cat.slug] || '📦'}
              </span>
              <span className="text-sm font-semibold text-blue-900 
                               group-hover:text-yellow-500">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Featured Products
          </h2>

          {loading ? (
            <div className="text-center text-gray-400 py-10">
              Loading products...
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No featured products yet. Add some from admin panel!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 
                            md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/products"
              className="bg-blue-900 text-white px-8 py-3 rounded-full
                         font-bold hover:bg-blue-800 transition">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">
          Why Choose Baba Traders?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '✅', title: 'Quality Products',
              desc: 'Every product is carefully selected for quality' },
            { icon: '🚚', title: 'Fast Delivery',
              desc: 'Quick delivery across Pandharpur & nearby areas' },
            { icon: '💰', title: 'Best Prices',
              desc: 'Competitive prices with regular discounts & offers' },
          ].map(item => (
            <div key={item.title}
              className="bg-white rounded-xl p-8 shadow hover:shadow-lg transition">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}