import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error)
    }
}