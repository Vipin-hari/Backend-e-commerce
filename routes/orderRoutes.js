const express = require('express');
const { placeOrder, getOrderHistory } = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware'); // JWT middleware for protecting routes
const router = express.Router();

// Place an order
router.post('/place', verifyToken, placeOrder);

// Get user's order history
router.get('/', verifyToken, getOrderHistory);

module.exports = router;
