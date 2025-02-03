require('dotenv').config(); // Add this at top

module.exports = {
    "database": process.env.MONGO_URI,
    "port": process.env.PORT || 3000, // Fallback to 3000 if not set
    "secretKey": process.env.JWT_SECRET
};