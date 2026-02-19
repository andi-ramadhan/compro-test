const { nanoid } = require('nanoid');
const { db } = require('../database/pg');

//GET all
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await db.any('SELECT * FROM blog_data ORDER BY created_at DESC');
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({ message: 'Gagal mengambil data blog' });
  }
};

//GET by id
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await db.oneOrNone('SELECT * FROM blog_data WHERE id = $1', [id]);

    if (!blog) {
      return res.status(404).json({ message: 'Blog tidak ditemukan' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Get blog by id error:', error);
    res.status(500).json({ message: 'Gagal mengambil data blog' });
  }
};

//POST
exports.addBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const id = nanoid();

    const newBlog = await db.one(
      'INSERT INTO blog_data (id, title, slug, content, author) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, title, id, content, author]
    );

    res.status(201).json({
      message: 'Blog berhasil ditambahkan',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Add blog error:', error);
    res.status(500).json({ message: 'Gagal menambahkan blog' });
  }
};

//PUT
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    const existingBlog = await db.oneOrNone('SELECT * FROM blog_data WHERE id = $1', [id]);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog tidak ditemukan' });
    }

    const slugConflict = await db.oneOrNone('SELECT * FROM blog_data WHERE slug = $1 AND id != $2', [id, id]);
    if (slugConflict) {
      return res.status(400).json({ message: 'Blog dengan judul yang mirip sudah ada' });
    }

    const updatedBlog = await db.one(
      'UPDATE blog_data SET title = $1, slug = $2, content = $3, author = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [title, id, content, author, id]
    );

    res.status(200).json({
      message: 'Blog berhasil diupdate',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Gagal mengupdate blog' });
  }
};

//DELETE
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBlog = await db.oneOrNone('SELECT * FROM blog_data WHERE id = $1', [id]);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog tidak ditemukan' });
    }

    await db.none('DELETE FROM blog_data WHERE id = $1', [id]);

    res.status(200).json({ message: 'Blog berhasil dihapus' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Gagal menghapus blog' });
  }
};