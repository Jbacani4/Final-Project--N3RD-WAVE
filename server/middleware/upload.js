const multer = require('multer');
const { avatarStorage, cafePhotoStorage } = require('../config/cloudinaryConfig');

// Middleware for avatar uploads
const uploadAvatar = multer({ storage: avatarStorage });

// Middleware for cafe photo uploads
const uploadCafePhoto = multer({ storage: cafePhotoStorage });

module.exports = { uploadAvatar, uploadCafePhoto };