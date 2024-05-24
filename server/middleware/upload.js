const multer = require('multer');
const { avatarStorage, cafePhotoStorage } = require('../config/cloudinaryConfig');

const uploadAvatar = multer({ storage: avatarStorage });
const uploadCafePhoto = multer({ storage: cafePhotoStorage });

module.exports = { uploadAvatar, uploadCafePhoto };