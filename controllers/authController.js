const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult}=require('express-validator');
// Register user function
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});   
    }
  try {
    const { username, email, password } = req.body;

    // Check if user or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this username or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user function
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Information Function
const getUserInfo = async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from the JWT
      const user = await User.findById(userId).select('-password'); // Exclude password from the response
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user); // Return user information
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { registerUser, loginUser, getUserInfo }; // Make sure to export getUserInfo
  