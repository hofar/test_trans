// routes/transactions.js

const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Middleware untuk memeriksa token JWT
const authenticateToken = require('../middleware/authenticateToken');

// Handler untuk daftar transaksi
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Ambil daftar transaksi pengguna dari database
        const getTransactionsQuery = 'SELECT id, transaction_date, items, total_amount, payment_status FROM transactions WHERE user_id = $1';
        const getTransactionsValues = [userId];
        const transactionsResult = await pool.query(getTransactionsQuery, getTransactionsValues);

        const transactions = transactionsResult.rows;

        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Handler untuk membuat transaksi
router.post('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { transaction_date, items, total_amount, payment_status } = req.body;

        // Simpan data transaksi ke database
        const createTransactionQuery = 'INSERT INTO transactions (user_id, transaction_date, items, total_amount, payment_status) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        const createTransactionValues = [userId, transaction_date, items, total_amount, payment_status];
        const createTransactionResult = await pool.query(createTransactionQuery, createTransactionValues);
        const transactionId = createTransactionResult.rows[0].id;

        res.status(201).json({ message: 'Transaction created', transactionId });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Handler untuk memperbarui transaksi
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const transactionId = req.params.id;
        const { transaction_date, items, total_amount, payment_status } = req.body;

        // Periksa apakah transaksi ada dan milik pengguna
        const checkTransactionQuery = 'SELECT * FROM transactions WHERE id = $1 AND user_id = $2';
        const checkTransactionValues = [transactionId, userId];
        const transactionResult = await pool.query(checkTransactionQuery, checkTransactionValues);

        if (transactionResult.rowCount === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Update data transaksi
        const updateTransactionQuery = 'UPDATE transactions SET transaction_date = $1, items = $2, total_amount = $3, payment_status = $4 WHERE id = $5';
        const updateTransactionValues = [transaction_date, items, total_amount, payment_status, transactionId];
        await pool.query(updateTransactionQuery, updateTransactionValues);

        res.status(200).json({ message: 'Transaction updated' });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Handler untuk menghapus transaksi
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const transactionId = req.params.id;

        // Periksa apakah transaksi ada dan milik pengguna
        const checkTransactionQuery = 'SELECT * FROM transactions WHERE id = $1 AND user_id = $2';
        const checkTransactionValues = [transactionId, userId];
        const transactionResult = await pool.query(checkTransactionQuery, checkTransactionValues);

        if (transactionResult.rowCount === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Hapus transaksi dari database
        const deleteTransactionQuery = 'DELETE FROM transactions WHERE id = $1';
        const deleteTransactionValues = [transactionId];
        await pool.query(deleteTransactionQuery, deleteTransactionValues);

        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
