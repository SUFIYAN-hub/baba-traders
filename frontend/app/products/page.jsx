'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/api';

// Separate component for the products content
function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filters, setFilters]       = useState({
    category: searchParams.get('category') || '',
    search:   '',
    sort:     'newest'
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = '?';
        if (filters.category) query += `category=${filters.category}&`;
        if (filters.search)   query += `search=${filters.search}&`;
        if (filters.sort)     query += `sort=${filters.sort}&`;

        const data = await getProducts(query);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">All Products</h1>
        <p className="text-gray-500">
          Browse our complete collection of quality products
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-8 grid grid-cols-1 
                      md:grid-cols-3 gap-4">

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Search Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="newest">Newest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center text-gray-400 py-20">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400 mb-4">😞 No products found</p>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            Showing <span className="font-semibold">{products.length}</span> products
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                          lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Main component wrapped in Suspense
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-400 py-20">
          Loading products...
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}