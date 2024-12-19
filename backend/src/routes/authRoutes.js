const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middelwares/authMiddleware');
const router = express.Router();

// Routes for authentication
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser);       // Login a user
router.get('/profile', protect, getProfile); // Get the profile of logged-in user

module.exports = router;
