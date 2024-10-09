// productRoutes.js
const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware'); // Ensure JWT verification
const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', verifyToken, createProduct); // Only admin can add
router.put('/:id', verifyToken, updateProduct); // Only admin can update
router.delete('/:id', verifyToken, deleteProduct); // Only admin can delete

module.exports = router;
