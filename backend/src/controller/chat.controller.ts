import {Request, Response} from 'express';
import {accessChat, fetchChats} from '../service/chat.service';

export const createChat = async(req: Request, res: Response) => {
    const {userId} = req.body;
    const user = (req as any).user;

    try {
        const chat = await accessChat(userId, user);
        res.status(201).json(chat);
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
    
}

export const getChats = async(req: Request, res: Response) => {
    const user = (req as any).user;
    
    try {
        const chats = await fetchChats(user);
        res.status(200).json(chats);
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}