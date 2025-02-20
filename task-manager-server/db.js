// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5433,
  database: 'lumaa',
});

module.exports = pool;
