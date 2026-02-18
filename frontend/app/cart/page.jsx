'use client';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">Add some products to get started!</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold
                     hover:bg-blue-800 transition">
          Browse Products
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      router.push('/login');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        Shopping Cart ({cartItems.length} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => {
            const price = item.discountPrice > 0 ? item.discountPrice : item.price;
            return (
              <div key={item._id}
                className="bg-white rounded-lg shadow p-4 flex gap-4">

                {/* Product Image */}
                <img
                  src={item.images?.[0] || '/placeholder.png'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.category?.name}
                  </p>
                  <p className="text-lg font-bold text-blue-900">
                    ₹{price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold">
                    Remove
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded 
                                 hover:bg-gray-100 font-bold">
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded 
                                 hover:bg-gray-100 font-bold">
                      +
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    Subtotal: <span className="font-bold">₹{price * item.quantity}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-900">₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg 
                         font-bold text-lg hover:bg-yellow-300 transition">
              {user ? 'Proceed to Checkout →' : 'Login to Checkout →'}
            </button>

            <button
              onClick={() => router.push('/products')}
              className="w-full mt-3 border border-blue-900 text-blue-900 py-2 
                         rounded-lg font-semibold hover:bg-blue-50 transition">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}