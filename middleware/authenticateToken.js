// middleware/authenticateToken.js

const jwt = require('jsonwebtoken');
const { pool } = require('../db');

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication token is required' });
        }

        const decodedToken = jwt.verify(token, 'your-secret-key'); // Ganti dengan kunci rahasia yang aman

        const userId = decodedToken.userId;

        // Periksa apakah pengguna ada dalam database
        const getUserQuery = 'SELECT * FROM users WHERE id = $1';
        const getUserValues = [userId];
        const userResult = await pool.query(getUserQuery, getUserValues);

        if (userResult.rowCount === 0) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }

        req.user = { id: userId };
        next();
    } catch (error) {
        console.error('Error authenticating token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = authenticateToken;
