import User, {NewUser} from '../model/user.model';
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/jwt';
import mongoose from 'mongoose';

//Create New User
export const createUser = async(username: string, email:string, password:string): Promise<NewUser> => {
    //check whether user is already registered
    const existingUser = await User.findOne({email});
    if (existingUser){
        throw new Error("User is already registered");
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create and save user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    return await newUser.save();
}


//User login
export const userLogin = async (username: string, password: string) => {
    //check whether user is already registered
    const existingUser = await User.findOne({username});
    if (!existingUser){
        throw new Error("User doesn't exist");
    }

    //match password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    
    //generate JWT Token
    const token = generateToken((existingUser._id as mongoose.Types.ObjectId).toString());

    const {_id} = existingUser;
    const user = {
        _id,
        token
    }
    return user;
}


//Search a user
export const searchUser = async (id:string, search?: string) => {
    const query = search 
    ? 
        { username: {$regex: search, $options: 'i'}} 
    :   {}

    const users = await User.find(query).find({_id: {$ne: id}});
    return users;
}