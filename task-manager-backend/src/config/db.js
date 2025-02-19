require('dotenv').config();
const { Pool } = require('pg');

console.log("Connecting to PostgreSQL with:");
console.log("Host:", process.env.DB_HOST);
console.log("Port:", process.env.DB_PORT);
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);
console.log("Password type:", typeof process.env.DB_PASSWORD);  // Debugging check

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),  // Ensure it's treated as a string
  database: process.env.DB_NAME
});

module.exports = pool;

