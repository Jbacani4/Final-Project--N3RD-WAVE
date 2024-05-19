const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


          
cloudinary.config({ 
  cloud_name: 'db1hbtsyt', 
  api_key: '716247999617265', 
  api_secret: 'Tvye-lhoSLwDayABQL9Tayj5NCI' 
});

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