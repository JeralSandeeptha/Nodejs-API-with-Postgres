const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'root',
    database: 'todos',
    host: 'localhost',
    port: 5432
});

pool.connect((err) => {
    if (err) throw err;
    console.log('Connected to Postgres Server!');
});

module.exports = pool;