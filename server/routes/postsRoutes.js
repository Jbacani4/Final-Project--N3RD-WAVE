const express = require('express');
const { createPost, getPosts, getSinglePost, getUserPosts, editPost, deletePost } = require('../controllers/postController');
const { uploadCafePhoto } = require('../middleware/upload');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, uploadCafePhoto.single('image'), createPost);
router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.get('/users/:id', getUserPosts);
router.patch('/:id', authenticateToken, uploadCafePhoto.single('image'), editPost);
router.delete('/:id', authenticateToken, deletePost);

module.exports = router;