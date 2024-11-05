// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const User = require('./models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch(err => {
//   console.log('Error connecting to MongoDB:', err.message);
// });

// // Root Route
// app.get('/', (req, res) => {
//   res.send('Server and Database are up and running!');
// });

// app.use(express.json());

// // Register Route
// app.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if user or email already exists
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User with this username or email already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'User does not exist' });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h'
//     });

//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.split(" ")[1]; // Grabs the token after "Bearer "
//   if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// app.get('/dashboard', authMiddleware, (req, res) => {
//   res.json({ message: 'Welcome to your dashboard!' });
// });
// controllers/authController.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Middleware
app.use(express.json()); // Parse JSON bodies

// Root Route
app.get('/', (req, res) => {
  res.send('Server and Database are up and running!');
});

// Use Auth Routes
app.use('/api/auth', authRoutes); // This should work if authRoutes is correct

// Protected Route
app.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
