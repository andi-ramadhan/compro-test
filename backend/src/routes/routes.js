const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

//health check
router.get('/health', (req, res) => {
  res.send('OK').status(200)
});

//auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

//public blog routes
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);

//protected blog routes
router.post('/blogs', authMiddleware, blogController.addBlog);
router.put('/blogs/:id', authMiddleware, blogController.updateBlog);
router.delete('/blogs/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;