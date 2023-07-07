// routes/profile.js

const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Middleware untuk memeriksa token JWT
const authenticateToken = require('../middleware/authenticateToken');

// Handler untuk profil pengguna
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Ambil data profil pengguna dari database
        const getUserQuery = 'SELECT id, username, name, email, gender FROM users WHERE id = $1';
        const getUserValues = [userId];
        const userResult = await pool.query(getUserQuery, getUserValues);

        if (userResult.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userResult.rows[0];

        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
