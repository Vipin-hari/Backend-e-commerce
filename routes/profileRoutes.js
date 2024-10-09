// profileRoutes.js
const express = require('express');
const { updateUserProfile } = require('../controllers/profileController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/', verifyToken, updateUserProfile);

module.exports = router;
