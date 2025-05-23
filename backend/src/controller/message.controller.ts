import {Request, Response} from 'express';
import {createMessage, getAllMessages} from '../service/message.service';

export const sendMessage = async(req: Request, res: Response) =>{
    const {content, chatId} = req.body; 
    const userId = (req as any).user;

    try {
        const message = await createMessage(content, chatId, userId);
        res.status(200).json(message);
    } catch (error: any) {
        res.status(200).json();
    }
}

export const fetchMessages = async(req: Request, res: Response) => {
    const chatId = req.params.chatId;
    try {
        const messages = await getAllMessages(chatId);
        res.status(200).json(messages);
    } catch (error: any) {
        res.status(200).json();
    }
}