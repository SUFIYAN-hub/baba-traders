'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-gradient-to-r from-blue-900 to-indigo-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`text-3xl transform group-hover:rotate-12 transition-transform duration-300 ${
              scrolled ? '' : 'filter drop-shadow-lg'
            }`}>
              🛍️
            </div>
            <div>
              <h1 className={`text-xl md:text-2xl font-extrabold transition-colors ${
                scrolled ? 'text-blue-900' : 'text-white'
              }`}>
                Baba Traders
              </h1>
              <p className={`text-xs font-medium ${
                scrolled ? 'text-yellow-600' : 'text-yellow-400'
              }`}>
                Quality You Trust
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link 
              href="/" 
              className={`hover:scale-105 transition-all duration-200 ${
                scrolled 
                  ? 'text-gray-700 hover:text-blue-900' 
                  : 'text-white hover:text-yellow-400'
              }`}>
              Home
            </Link>
            <Link 
              href="/products" 
              className={`hover:scale-105 transition-all duration-200 ${
                scrolled 
                  ? 'text-gray-700 hover:text-blue-900' 
                  : 'text-white hover:text-yellow-400'
              }`}>
              Products
            </Link>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                      scrolled
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}>
                    👑 Admin
                  </Link>
                )}
                <Link 
                  href="/orders" 
                  className={`hover:scale-105 transition-all duration-200 ${
                    scrolled 
                      ? 'text-gray-700 hover:text-blue-900' 
                      : 'text-white hover:text-yellow-400'
                  }`}>
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className={`hover:scale-105 transition-all duration-200 ${
                    scrolled 
                      ? 'text-red-600 hover:text-red-700' 
                      : 'text-red-400 hover:text-red-300'
                  }`}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`hover:scale-105 transition-all duration-200 ${
                    scrolled 
                      ? 'text-gray-700 hover:text-blue-900' 
                      : 'text-white hover:text-yellow-400'
                  }`}>
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                    scrolled
                      ? 'bg-blue-900 text-white hover:bg-blue-800'
                      : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
                  }`}>
                  Register
                </Link>
              </>
            )}

            {/* Cart Icon */}
            <Link 
              href="/cart" 
              className="relative group">
              <div className={`text-2xl transform group-hover:scale-110 transition-transform ${
                scrolled ? '' : 'filter drop-shadow-lg'
              }`}>
                🛒
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 
                               text-white text-xs font-bold rounded-full w-6 h-6
                               flex items-center justify-center shadow-lg
                               animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Cart Icon */}
            <Link href="/cart" className="relative">
              <span className={`text-2xl ${scrolled ? '' : 'filter drop-shadow-lg'}`}>🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 
                               text-white text-xs font-bold rounded-full w-5 h-5
                               flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`text-3xl transition-transform duration-300 ${
                menuOpen ? 'rotate-90' : ''
              } ${scrolled ? 'text-blue-900' : 'text-white'}`}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-2xl z-50 
                        transform transition-transform duration-300 ease-out
                        overflow-y-auto md:hidden">
            <div className="p-6 space-y-4">
              {user && (
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Welcome,</p>
                  <p className="font-bold text-blue-900">{user.name}</p>
                  {user.role === 'admin' && (
                    <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 
                                   px-2 py-1 rounded-full font-semibold">
                      👑 Admin
                    </span>
                  )}
                </div>
              )}

              <Link 
                href="/" 
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-900 
                         rounded-lg font-semibold transition-colors">
                🏠 Home
              </Link>
              
              <Link 
                href="/products" 
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-900 
                         rounded-lg font-semibold transition-colors">
                🛍️ Products
              </Link>

              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 px-4 bg-purple-50 text-purple-700 hover:bg-purple-100
                               rounded-lg font-semibold transition-colors">
                      👑 Admin Dashboard
                    </Link>
                  )}
                  <Link 
                    href="/orders" 
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-900 
                             rounded-lg font-semibold transition-colors">
                    📦 My Orders
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="w-full text-left py-3 px-4 text-red-600 hover:bg-red-50
                             rounded-lg font-semibold transition-colors">
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-900 
                             rounded-lg font-semibold transition-colors">
                    🔐 Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 bg-gradient-to-r from-blue-900 to-blue-700 
                             text-white text-center rounded-lg font-bold hover:from-yellow-400 
                             hover:to-yellow-500 hover:text-blue-900 transition-all duration-300">
                    ✨ Register Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}