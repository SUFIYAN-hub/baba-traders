const Product = require('../models/Product');

// @GET /api/products — Get all products (with filter, search, category)
const getProducts = async (req, res) => {
  try {
    const { category, search, featured, sort } = req.query;
    let query = { isActive: true };

    if (category) query.category = category;
    if (featured)  query.isFeatured = true;
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // case-insensitive
    }

    let sortOption = {};
    if (sort === 'price_low')  sortOption = { price: 1 };
    if (sort === 'price_high') sortOption = { price: -1 };
    if (sort === 'newest')     sortOption = { createdAt: -1 };
    if (sort === 'popular')    sortOption = { sold: -1 };

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/products/:id — Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @POST /api/products — Admin: Create product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/products/:id — Admin: Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @DELETE /api/products/:id — Admin: Delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts, getProductById,
  createProduct, updateProduct, deleteProduct
};