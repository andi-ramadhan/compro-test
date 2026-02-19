const bcrypt = require('bcrypt');
const { db } = require('./database/pg');
require('dotenv').config();

async function seedAdmin() {
  try {
    console.log('Seeding admin user...');

    const existingAdmin = await db.oneOrNone('SELECT * FROM users WHERE username = $1', ['admin']);
    if (existingAdmin) {
      console.log('Admin user sudah ada, skip seeding.');
      process.exit(0);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('secret', saltRounds);

    await db.one(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      ['admin', hashedPassword]
    );

    console.log('Admin user berhasil dibuat!');
    console.log('Username: admin');
    console.log('Password: secret');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedAdmin();
