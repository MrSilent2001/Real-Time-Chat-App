import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db_url = process.env.DB as string;

export const dbConnect = async() => {
    try {
        await mongoose.connect(db_url);
        console.log("Database Connection Successful");
    } catch (error) {
        console.log("Database Connection Failed", error);
        process.exit(1);
    }
}