// server.js

const express = require('express');
const app = express();

// Middleware untuk membaca body permintaan dengan format JSON
app.use(express.json());

// Middleware untuk menangani permintaan CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Ganti dengan URL frontend yang sesuai
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const transactionRoutes = require('./routes/transactions');

// Menggunakan routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/transactions', transactionRoutes);

// Server listening
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
