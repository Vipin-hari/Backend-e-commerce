const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); 
const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Protected Route (example)
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Profile accessed', user: req.user }); // Example of using req.user
});

module.exports = router;
