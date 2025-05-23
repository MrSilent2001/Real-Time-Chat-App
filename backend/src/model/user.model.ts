import mongoose, {Schema, Document } from 'mongoose';

export interface NewUser extends Document{
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true
    }
); 

export default mongoose.model<NewUser>('User', userSchema);