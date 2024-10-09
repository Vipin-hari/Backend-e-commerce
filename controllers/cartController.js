const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming req.user is set by the verifyToken middleware

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if cart exists for the user
    let cart = await Cart.findOne({ userId });

    // If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (itemIndex > -1) {
      // If the item already exists in the cart, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Otherwise, add a new item to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  const userId = req.user.id; // Get user ID from the verified token

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Checkout (Place order)
exports.checkout = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Here, you would typically create an order with the cart items
    // For now, we'll just clear the cart
    await Cart.deleteOne({ userId });
    
    res.json({ message: 'Checkout successful', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
