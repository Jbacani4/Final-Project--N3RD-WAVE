const express = require('express');
const { registerUser, loginUser, getUser, changeAvatar } = require('../controllers/userController');
const upload = require('../middleware/upload');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authenticateToken, getUser);
router.post('/change-avatar', authenticateToken, upload.single('avatar'), changeAvatar);

module.exports = router;
