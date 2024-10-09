const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Assuming you have a Cart model

exports.placeOrder = async (req, res) => {
  const userId = req.user.id; // Get user ID from JWT
  const { totalAmount } = req.body; // Ensure total amount is sent in the request

  try {
    // Retrieve the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create the order
    const newOrder = new Order({
      userId,
      products: cart.products,
      totalAmount,
    });

    await newOrder.save();

    // Clear the cart after placing the order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
