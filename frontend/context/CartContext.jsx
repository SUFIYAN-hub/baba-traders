'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('babaCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('babaCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Total items count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Total price
  const cartTotal = cartItems.reduce((acc, item) => {
    const price = item.discountPrice > 0 ? item.discountPrice : item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart,
      updateQuantity, clearCart, cartCount, cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);