'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getProducts, createProduct, updateProduct, deleteProduct,
  getCategories, getAllOrders, updateOrder
} from '@/lib/api';

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct]   = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: 0, discountPrice: 0,
    category: '', images: [''], stock: 0, isFeatured: false
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchData();
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cats = await getCategories();
      setCategories(cats);

      if (activeTab === 'products') {
        const prods = await getProducts('');
        setProducts(prods);
      } else if (activeTab === 'orders') {
        const ords = await getAllOrders(user.token);
        setOrders(ords);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm({
      ...productForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productForm, user.token);
        alert('✅ Product updated!');
      } else {
        await createProduct(productForm, user.token);
        alert('✅ Product created!');
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '', description: '', price: 0, discountPrice: 0,
        category: '', images: [''], stock: 0, isFeatured: false
      });
      fetchData();
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice || 0,
      category: product.category._id,
      images: product.images || [''],
      stock: product.stock,
      isFeatured: product.isFeatured
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id, user.token);
      alert('✅ Product deleted!');
      fetchData();
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { orderStatus: newStatus }, user.token);
      alert('✅ Order status updated!');
      fetchData();
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          👑 Admin Dashboard
        </h1>
        <p className="text-gray-500">Manage your Baba Traders store</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        {['products', 'orders'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold border-b-2 transition
              ${activeTab === tab
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-gray-500 hover:text-blue-900'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Products ({products.length})
            </h2>
            <button
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  name: '', description: '', price: 0, discountPrice: 0,
                  category: '', images: [''], stock: 0, isFeatured: false
                });
                setShowProductForm(true);
              }}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg
                         font-semibold hover:bg-blue-800 transition">
              + Add Product
            </button>
          </div>

          {/* Product Form Modal */}
          {showProductForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
                            justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] 
                              overflow-y-auto p-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>

                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={productForm.name}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Description *</label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      value={productForm.description}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Price *</label>
                      <input
                        type="number"
                        name="price"
                        required
                        value={productForm.price}
                        onChange={handleProductFormChange}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">
                        Discount Price (optional)
                      </label>
                      <input
                        type="number"
                        name="discountPrice"
                        value={productForm.discountPrice}
                        onChange={handleProductFormChange}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Category *</label>
                      <select
                        name="category"
                        required
                        value={productForm.category}
                        onChange={handleProductFormChange}
                        className="w-full px-3 py-2 border rounded-lg">
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Stock *</label>
                      <input
                        type="number"
                        name="stock"
                        required
                        value={productForm.stock}
                        onChange={handleProductFormChange}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Image URL (use https://via.placeholder.com/400 for testing)
                    </label>
                    <input
                      type="text"
                      name="images"
                      value={productForm.images[0]}
                      onChange={(e) => setProductForm({
                        ...productForm, images: [e.target.value]
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="https://via.placeholder.com/400"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={productForm.isFeatured}
                      onChange={handleProductFormChange}
                      className="w-5 h-5"
                    />
                    <label className="font-semibold">
                      Show on homepage (Featured Product)
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-900 text-white py-2 rounded-lg
                                 font-semibold hover:bg-blue-800">
                      {editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProductForm(false)}
                      className="flex-1 border border-gray-300 py-2 rounded-lg
                                 font-semibold hover:bg-gray-50">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Products Table */}
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Image</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Stock</th>
                    <th className="px-4 py-3 text-left">Featured</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <img
                          src={product.images?.[0] || '/placeholder.png'}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3 font-semibold">{product.name}</td>
                      <td className="px-4 py-3">{product.category?.name}</td>
                      <td className="px-4 py-3">
                        ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
                      </td>
                      <td className="px-4 py-3">{product.stock}</td>
                      <td className="px-4 py-3">
                        {product.isFeatured ? '⭐' : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:underline mr-3">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Orders ({orders.length})
          </h2>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No orders yet
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-mono text-sm font-semibold">
                        Order: {order._id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Customer: {order.user?.name} ({order.user?.phone})
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-900">
                        ₹{order.totalAmount}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Delivery Address:
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                      {order.shippingAddress.district}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Items:</p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-sm text-gray-600">
                        • {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Status:
                    </label>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                      className="px-3 py-1 border rounded text-sm font-semibold">
                      <option value="processing">Processing</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}