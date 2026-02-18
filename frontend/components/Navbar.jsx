'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          🛍️ Baba Traders
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/"         className="hover:text-yellow-400 transition">Home</Link>
          <Link href="/products" className="hover:text-yellow-400 transition">Products</Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className="hover:text-yellow-400 transition">
                  Admin
                </Link>
              )}
              <Link href="/orders" className="hover:text-yellow-400 transition">
                My Orders
              </Link>
              <button
                onClick={logout}
                className="hover:text-red-400 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login"    className="hover:text-yellow-400 transition">Login</Link>
              <Link href="/register" className="hover:text-yellow-400 transition">Register</Link>
            </>
          )}

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900
                               text-xs font-bold rounded-full w-5 h-5
                               flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-3 flex flex-col gap-3 text-sm">
          <Link href="/"         onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/cart"     onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <button onClick={() => { logout(); setMenuOpen(false); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login"    onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}