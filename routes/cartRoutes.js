// cartRoutes.js
const express = require('express');
const { addToCart, getCart, checkout } = require('../controllers/cartController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', verifyToken, addToCart);
router.get('/', verifyToken, getCart);
router.post('/checkout', verifyToken, checkout);

module.exports = router;
