const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function
const request = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// Auth APIs
export const registerUser  = (data)        => request('/api/auth/register', 'POST', data);
export const loginUser     = (data)        => request('/api/auth/login', 'POST', data);
export const getUserProfile= (token)       => request('/api/auth/profile', 'GET', null, token);

// Product APIs
export const getProducts   = (query = '')  => request(`/api/products${query}`);
export const getProductById= (id)          => request(`/api/products/${id}`);
export const createProduct = (data, token) => request('/api/products', 'POST', data, token);
export const updateProduct = (id, data, token) => request(`/api/products/${id}`, 'PUT', data, token);
export const deleteProduct = (id, token)   => request(`/api/products/${id}`, 'DELETE', null, token);

// Category APIs
export const getCategories   = ()              => request('/api/categories');
export const createCategory  = (data, token)   => request('/api/categories', 'POST', data, token);

// Order APIs
export const createOrder   = (data, token) => request('/api/orders', 'POST', data, token);
export const getMyOrders   = (token)       => request('/api/orders/myorders', 'GET', null, token);
export const getAllOrders   = (token)       => request('/api/orders', 'GET', null, token);
export const updateOrder   = (id, data, token) => request(`/api/orders/${id}`, 'PUT', data, token);