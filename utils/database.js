const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_app',
    password: process.env.PSW_DB,
    port: 5432,
});

module.exports = pool;