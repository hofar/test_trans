// db.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // hofaris1_postgres
    host: 'localhost',
    database: 'test_trans',
    password: '123', // cPjphyIXGIi]
    port: 5432, // ganti dengan port yang sesuai
});

module.exports = { pool };
