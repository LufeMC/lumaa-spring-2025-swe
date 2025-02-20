import dotenv from 'dotenv';
import pkg from 'pg';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pkg;

console.log('🔎 DATABASE_URL:', process.env.DATABASE_URL);  // Debug log

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL 🐘');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err.message);
});

export default pool;
