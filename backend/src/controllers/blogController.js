const { nanoid } = require('nanoid');
const { db } = require('../database/pg');

//GET all (support filter: ?author=xxx&sort=newest|oldest)
exports.getAllBlogs = async (req, res) => {
  try {
    const { author, sort } = req.query;

    let query = 'SELECT * FROM blog_data';
    const params = [];

    if (author) {
      params.push(author);
      query += ` WHERE author = $${params.length}`;
    }

    const order = sort === 'oldest' ? 'ASC' : 'DESC';
    query += ` ORDER BY created_at ${order}`;

    const blogs = await db.any(query, params);

    //get distinct author list for filter dropdown
    const authors = await db.any('SELECT DISTINCT author FROM blog_data WHERE author IS NOT NULL ORDER BY author ASC');

    res.status(200).json({
      success: true,
      data: {
        blogs,
        authors: authors.map(a => a.author),
      },
    });
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data blog' });
  }
};

//GET by id
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await db.oneOrNone('SELECT * FROM blog_data WHERE id = $1', [id]);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('Get blog by id error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data blog' });
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
      success: true,
      message: 'Blog berhasil ditambahkan',
      data: newBlog,
    });
  } catch (error) {
    console.error('Add blog error:', error);
    res.status(500).json({ success: false, message: 'Gagal menambahkan blog' });
  }
};

//PUT
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    const existingBlog = await db.oneOrNone('SELECT * FROM blog_data WHERE id = $1', [id]);
    if (!existingBlog) {
      return res.status(404).json({ success: false, message: 'Blog tidak ditemukan' });
    }

    const updatedBlog = await db.one(
      'UPDATE blog_data SET title = $1, slug = $2, content = $3, author = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [title, id, content, author, id]
    );

    res.status(200).json({
      success: true,
      message: 'Blog berhasil diupdate',
      data: updatedBlog,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengupdate blog' });
  }
};

//DELETE
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBlog = await db.oneOrNone('SELECT * FROM blog_data WHERE id = $1', [id]);
    if (!existingBlog) {
      return res.status(404).json({ success: false, message: 'Blog tidak ditemukan' });
    }

    await db.none('DELETE FROM blog_data WHERE id = $1', [id]);

    res.status(200).json({ success: true, message: 'Blog berhasil dihapus' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ success: false, message: 'Gagal menghapus blog' });
  }
};