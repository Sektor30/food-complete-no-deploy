import { config } from 'dotenv'

config();

console.log(process.env.MONGO_DB)
export const MONGO_DB = process.env.MONGO_DB || "27017";
export const PORT = process.env.PORT || 27017;
export const JWT_SECRET = process.env.JWT_SECRET || "";

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "27017";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "27017";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "27017";