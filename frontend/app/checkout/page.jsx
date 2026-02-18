'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: 'Pandharpur',
    district: 'Solapur',
    state: 'Maharashtra',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [user, cartItems]);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepare order items
      const items = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        price: item.discountPrice > 0 ? item.discountPrice : item.price,
        quantity: item.quantity,
        image: item.images?.[0] || ''
      }));

      const orderData = {
        items,
        shippingAddress,
        paymentMethod,
        totalAmount: cartTotal
      };

      await createOrder(orderData, user.token);

      // Clear cart and redirect
      clearCart();
      alert('🎉 Order placed successfully!');
      router.push('/orders');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || cartItems.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                📍 Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={shippingAddress.street}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500"
                    placeholder="House no., Street name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={shippingAddress.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    District *
                  </label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={shippingAddress.district}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={shippingAddress.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    pattern="[0-9]{6}"
                    value={shippingAddress.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500"
                    placeholder="413304"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                💳 Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 rounded-lg
                                  cursor-pointer hover:bg-blue-50 transition
                                  border-blue-900">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      💵 Cash on Delivery (COD)
                    </p>
                    <p className="text-sm text-gray-500">
                      Pay when you receive the product
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 rounded-lg
                                  cursor-pointer hover:bg-gray-50 transition
                                  border-gray-300 opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="Razorpay"
                    disabled
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      💳 Online Payment (Coming Soon)
                    </p>
                    <p className="text-sm text-gray-500">
                      UPI, Cards, Net Banking
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 
                              rounded-lg p-4">
                {error}
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map(item => {
                  const price = item.discountPrice > 0 ? item.discountPrice : item.price;
                  return (
                    <div key={item._id} className="flex gap-3 text-sm">
                      <img
                        src={item.images?.[0]}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-gray-500">
                          {item.quantity} × ₹{price}
                        </p>
                      </div>
                      <p className="font-bold text-blue-900">
                        ₹{price * item.quantity}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-900">₹{cartTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg 
                           font-bold text-lg hover:bg-yellow-300 transition
                           disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Placing Order...' : 'Place Order 🎉'}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                By placing order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}