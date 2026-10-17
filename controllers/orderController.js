const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create a new order (checkout)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Validate each item and check stock
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;

      // Deduct stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders for the logged-in user
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name image price');

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure the order belongs to the requesting user
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrderById };
