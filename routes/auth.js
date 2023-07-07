// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

// Handler untuk pembuatan akun
router.post('/signup', async (req, res) => {
    try {
        const { username, password, name, email, gender } = req.body;

        // Periksa apakah username sudah digunakan
        const checkUsernameQuery = 'SELECT * FROM users WHERE username = $1';
        const checkUsernameValues = [username];
        const usernameResult = await pool.query(checkUsernameQuery, checkUsernameValues);

        if (usernameResult.rowCount > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password sebelum disimpan
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Simpan data akun ke database
        const createUserQuery = 'INSERT INTO users (username, password, name, email, gender) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        const createUserValues = [username, hashedPassword, name, email, gender];
        const createUserResult = await pool.query(createUserQuery, createUserValues);
        const userId = createUserResult.rows[0].id;

        // Buat token JWT
        const token = jwt.sign({ userId }, 'your-secret-key'); // Ganti dengan kunci rahasia yang aman

        res.status(201).json({ message: 'Account created', token });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Handler untuk login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Periksa apakah username ada dalam database
        const getUserQuery = 'SELECT * FROM users WHERE username = $1';
        const getUserValues = [username];
        const userResult = await pool.query(getUserQuery, getUserValues);

        if (userResult.rowCount === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Periksa kecocokan password
        const user = userResult.rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Buat token JWT
        const token = jwt.sign({ userId: user.id }, 'your-secret-key'); // Ganti dengan kunci rahasia yang aman

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
