const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../database/pg');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username sudah dipakai' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await db.one(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: 'Register berhasil',
      data: newUser,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
};

//login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: { token },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
};
