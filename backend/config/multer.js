import cloudinary from './cloudinary.js'; // Ensure correct relative path
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce-images", // Specify folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Specify allowed file formats
  },
});

const upload = multer({ storage });

export default upload;
