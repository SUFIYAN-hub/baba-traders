'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Add newsletter API integration later
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🛍️</span>
              <div>
                <h3 className="text-2xl font-bold text-yellow-400">Baba Traders</h3>
                <p className="text-xs text-gray-300">Quality You Can Trust</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Pandharpur's most trusted online store for watches, belts, wallets, 
              kitchen items, and more. Your satisfaction is our priority!
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center
                                   hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300
                                   transform hover:scale-110">
                <span className="text-xl">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center
                                   hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300
                                   transform hover:scale-110">
                <span className="text-xl">📧</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center
                                   hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300
                                   transform hover:scale-110">
                <span className="text-xl">💬</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <span>🔗</span> Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'All Products', href: '/products' },
                { name: 'My Orders', href: '/orders' },
                { name: 'Cart', href: '/cart' },
                { name: 'Login', href: '/login' }
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.href} 
                    className="text-gray-300 hover:text-yellow-400 hover:translate-x-1 
                             inline-block transition-all duration-200">
                    → {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <span>📦</span> Categories
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Watches', icon: '⌚' },
                { name: 'Belts', icon: '👔' },
                { name: 'Clocks', icon: '🕐' },
                { name: 'Kitchen', icon: '🍳' },
                { name: 'Goggles', icon: '🕶️' },
                { name: 'Wallets', icon: '👛' }
              ].map(cat => (
                <li key={cat.name}>
                  <Link 
                    href={`/products?search=${cat.name.toLowerCase()}`}
                    className="text-gray-300 hover:text-yellow-400 hover:translate-x-1 
                             inline-block transition-all duration-200">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <span>📞</span> Contact Us
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-semibold text-white">Pandharpur</p>
                  <p className="text-sm">Solapur, Maharashtra</p>
                </div>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-lg">📞</span>
                <a href="tel:+919876543210" className="hover:text-yellow-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-lg">📧</span>
                <a href="mailto:support@babatraders.com" className="hover:text-yellow-400 transition-colors">
                  support@babatraders.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h5 className="font-bold text-yellow-400 mb-2">📬 Newsletter</h5>
              <p className="text-xs text-gray-300 mb-3">
                Get updates on new arrivals & exclusive offers!
              </p>
              
              {subscribed ? (
                <div className="bg-green-500 text-white px-4 py-3 rounded-lg text-center font-semibold
                              animate-pulse">
                  ✅ Subscribed!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-lg bg-white/20 border border-white/30
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400
                             focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold
                             hover:bg-yellow-300 transition-colors text-sm whitespace-nowrap">
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '✅', title: '100% Authentic', desc: 'Genuine Products' },
              { icon: '🚚', title: 'Free Delivery', desc: 'In Pandharpur' },
              { icon: '💳', title: 'Cash on Delivery', desc: 'Pay at Doorstep' },
              { icon: '🔄', title: 'Easy Returns', desc: '7 Days Policy' }
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl mb-2">{badge.icon}</span>
                <p className="font-bold text-sm text-yellow-400">{badge.title}</p>
                <p className="text-xs text-gray-400">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} <span className="text-yellow-400 font-semibold">Baba Traders</span>. 
              All rights reserved. Made with ❤️ in Pandharpur
            </p>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-yellow-400 transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}