// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1]; // Grabs the token after "Bearer "
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified user to the request object
        next(); // Call the next middleware or route handler
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;