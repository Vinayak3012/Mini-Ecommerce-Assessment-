const Product = require('../models/Product');

// @desc    Get all products with pagination, search, and sorting
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || '';
    const search = req.query.search || '';

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    let sort = {};
    if (sortBy === 'price_asc') sort = { price: 1 };
    else if (sortBy === 'price_desc') sort = { price: -1 };
    else sort = { createdAt: -1 }; // Default: newest first

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById };
