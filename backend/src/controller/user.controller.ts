import {Request, Response} from 'express';
import {createUser, userLogin} from '../service/user.service';

export const registerUser = async(req: Request, res: Response) => {
    const {username, email, password} = req.body;

    try {
        const newUser = await createUser(username, email, password);
        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
}


export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try {
        const user = await userLogin(username, password);
        res.status(200).json({
            message: 'Login Successful',
            user
        });
    } catch (error: any) {
        res.status(401).json({
            error: error.message
        });
    }
}