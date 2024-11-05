// authRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserInfo } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Make sure to import your middleware
const {body,validationResult} = require('express-validator');

const router = express.Router();

// Register route
router.post('/register',[
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ], registerUser);

// Login route
router.post('/login',[
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').exists().withMessage('Password is required'),
  ], loginUser);

// Get User Information Route
router.get('/me', authMiddleware, getUserInfo); // Use the authMiddleware for protection

module.exports = router;
