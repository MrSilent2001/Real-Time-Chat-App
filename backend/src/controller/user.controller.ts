import {Request, Response} from 'express';
import {createUser, userLogin, searchUser} from '../service/user.service';

//Register a new user
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


//User login
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


//Search a user
export const search = async (req: Request, res: Response) => {
    try {
        const id = (req as any).user.id;
        const search = req.query.search as string | undefined;

        const users = await searchUser(id, search);
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }
}