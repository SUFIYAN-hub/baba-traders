'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/api';

const categoryData = {
  watches: { icon: '⌚', color: 'from-blue-500 to-blue-700', desc: 'Timeless elegance' },
  belts: { icon: '👔', color: 'from-amber-500 to-amber-700', desc: 'Style & comfort' },
  clocks: { icon: '🕐', color: 'from-purple-500 to-purple-700', desc: 'Perfect timing' },
  kitchen: { icon: '🍳', color: 'from-green-500 to-green-700', desc: 'Cook with joy' },
  goggles: { icon: '🕶️', color: 'from-red-500 to-red-700', desc: 'Stylish protection' },
  wallets: { icon: '👛', color: 'from-indigo-500 to-indigo-700', desc: 'Carry in style' }
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-gradient-to-b from-gray-50 to-white">
      
      {/* HERO SECTION - Premium Design */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-block mb-4 px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30">
                <span className="text-yellow-400 font-semibold text-sm">✨ Pandharpur's #1 Choice</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Discover
                <span className="block bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  Timeless Style
                </span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                Premium watches, elegant belts, stylish wallets and more. 
                <span className="block mt-2 text-yellow-400 font-semibold">
                  Quality you can trust. Prices you'll love.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products"
                  className="group relative px-8 py-4 bg-yellow-400 text-blue-900 rounded-full
                           font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 
                           transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Shop Now</span>
                  <div className="absolute inset-0 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Link>
                
                <Link href="/products?category=watches"
                  className="px-8 py-4 border-2 border-white/30 backdrop-blur-sm rounded-full
                           font-bold text-lg hover:bg-white/10 hover:border-white/50
                           transition-all duration-300">
                  View Watches ⌚
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold">100% Authentic</p>
                    <p className="text-gray-300">Quality Guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <p className="font-bold">Free Delivery</p>
                    <p className="text-gray-300">In Pandharpur</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💳</span>
                  <div>
                    <p className="font-bold">Cash on Delivery</p>
                    <p className="text-gray-300">Pay when you receive</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hero Image/Visual */}
            <div className="relative z-10 hidden lg:block">
              <div className="relative">
                {/* Floating Product Cards Effect */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-400/20 rounded-3xl blur-2xl animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="text-center">
                    <div className="text-8xl mb-4 animate-bounce">⌚</div>
                    <h3 className="text-2xl font-bold mb-2">Premium Collection</h3>
                    <p className="text-gray-200 mb-4">Starting from ₹999</p>
                    <div className="flex items-center justify-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} className="text-yellow-400 text-xl">★</span>
                      ))}
                      <span className="ml-2 text-sm">(500+ Reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-24 fill-current text-gray-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* CATEGORIES SECTION - Modern Cards */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => {
            const data = categoryData[cat.slug] || { icon: '📦', color: 'from-gray-500 to-gray-700', desc: 'Shop now' };
            return (
              <Link
                key={cat._id}
                href={`/products?category=${cat._id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl 
                         transform hover:-translate-y-2 transition-all duration-300">
                <div className={`bg-gradient-to-br ${data.color} p-6 md:p-8 text-white h-full flex flex-col items-center justify-center text-center`}>
                  <div className="text-5xl md:text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {data.icon}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl mb-1">{cat.name}</h3>
                  <p className="text-xs md:text-sm text-white/80">{data.desc}</p>
                  
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                                transition-transform duration-1000"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold mb-4">
              ⭐ HANDPICKED FOR YOU
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">Our bestsellers that customers love</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 text-lg">No featured products yet.</p>
              <p className="text-gray-400 text-sm mt-2">Add some from the admin panel!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 8).map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/products"
                  className="inline-block px-8 py-4 bg-blue-900 text-white rounded-full
                           font-bold text-lg hover:bg-blue-800 shadow-lg hover:shadow-xl
                           transform hover:scale-105 transition-all duration-300">
                  View All Products →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Shop With Us?
          </h2>
          <p className="text-gray-600 text-lg">Your satisfaction is our priority</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🏆',
              title: 'Premium Quality',
              desc: 'Every product is handpicked and quality-checked before reaching you',
              color: 'from-yellow-400 to-orange-400'
            },
            {
              icon: '⚡',
              title: 'Lightning Fast Delivery',
              desc: 'Same-day delivery in Pandharpur. Get your order within hours!',
              color: 'from-blue-400 to-indigo-400'
            },
            {
              icon: '💰',
              title: 'Best Prices Guaranteed',
              desc: 'Competitive prices with regular offers and exclusive discounts',
              color: 'from-green-400 to-emerald-400'
            }
          ].map((item, i) => (
            <div key={i} 
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                       transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${item.color}`}></div>
              
              <div className={`text-6xl mb-4 inline-block p-4 bg-gradient-to-br ${item.color} 
                            rounded-2xl shadow-lg transform group-hover:scale-110 
                            transition-transform duration-300`}>
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-300 text-lg">Real reviews from real people</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Patil', city: 'Pandharpur', rating: 5, text: 'Amazing quality watches at best prices! Fast delivery too. Highly recommended! 👍' },
              { name: 'Sneha Deshmukh', city: 'Solapur', rating: 5, text: 'Bought a beautiful wallet for my husband. He loved it! Will shop again. ❤️' },
              { name: 'Amit Jadhav', city: 'Pandharpur', rating: 5, text: 'Great collection of products. Easy ordering and quick delivery. Best local shop online! 🌟' }
            ].map((review, i) => (
              <div key={i} 
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20
                         hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-100 mb-4 leading-relaxed italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-yellow-400">{review.name}</p>
                  <p className="text-sm text-gray-300">{review.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Ready to Shop?
          </h2>
          <p className="text-blue-900 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of happy customers in Pandharpur. Start shopping today and experience the difference!
          </p>
          <Link href="/products"
            className="inline-block px-10 py-5 bg-blue-900 text-white rounded-full
                     font-bold text-xl hover:bg-blue-800 shadow-xl hover:shadow-2xl
                     transform hover:scale-105 transition-all duration-300">
            Browse All Products 🛍️
          </Link>
        </div>
      </section>
    </div>
  );
}