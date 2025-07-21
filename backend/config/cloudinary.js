import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// CLOUD_NAME=dzapwlvq5
// CLOUD_API_KEY=699427746573229
// CLOUD_API_SECRET=ghCOkFC8kqzpffgDDu-exTXuO38

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true, // Always use HTTPS
});

export default cloudinary;