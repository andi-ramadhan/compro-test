const pgp = require('pg-promise')();
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgres://compro_admin:compro_admin@localhost:5432/compro_db';

const db = pgp(connectionString)

async function testConnection() {
  try {
    await db.connect();
    console.log('Successfully connected to PostgreSQL.');
    return true;
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message || error);
    return false;
  }
}


module.exports = { db, testConnection };