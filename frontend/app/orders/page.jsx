'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getMyOrders } from '@/lib/api';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(user.token);
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return null;

  const statusColors = {
    processing: 'bg-yellow-100 text-yellow-800',
    confirmed:  'bg-blue-100 text-blue-800',
    shipped:    'bg-purple-100 text-purple-800',
    delivered:  'bg-green-100 text-green-800',
    cancelled:  'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">My Orders</h1>

      {loading ? (
        <div className="text-center text-gray-400 py-20">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold
                       hover:bg-blue-800 transition">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">

              {/* Order Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-sm font-semibold text-gray-800">
                    {order._id}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                                   ${statusColors[order.orderStatus]}`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    Payment: {order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <img
                      src={item.image || '/placeholder.png'}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <p className="font-bold text-blue-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <p>Delivery to: {order.shippingAddress.city}, {order.shippingAddress.pincode}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-900">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}