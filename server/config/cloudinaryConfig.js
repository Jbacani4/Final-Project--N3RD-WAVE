const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Configuration for avatar uploads
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    format: async (req, file) => {
      switch (file.mimetype) {
        case 'image/jpeg':
        case 'image/jpg':
          return 'jpg';
        case 'image/png':
          return 'png';
        case 'image/gif':
          return 'gif';
        case 'image/webp':
          return 'webp';
        default:
          throw new Error('Unsupported file format');
      }
    },
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

// Configuration for cafe photo uploads
const cafePhotoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cafe_photos',
    format: async (req, file) => {
      switch (file.mimetype) {
        case 'image/jpeg':
        case 'image/jpg':
          return 'jpg';
        case 'image/png':
          return 'png';
        case 'image/gif':
          return 'gif';
        case 'image/webp':
          return 'webp';
        default:
          throw new Error('Unsupported file format');
      }
    },
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

module.exports = { cloudinary, avatarStorage, cafePhotoStorage };