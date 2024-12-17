import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import dotenv from "dotenv"
dotenv.config();


const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint to upload an image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
          res.status(400).json({ message: 'No file uploaded' });
          return 
        }

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads', // Optional: Set a folder for better organization
            public_id: path.parse(req.file.originalname).name, // Use the original filename as public ID
        });

        // Respond with the upload result
        res.status(200).json({
            message: 'Image uploaded successfully',
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image', error });
    }
});

export default router;
