import axios from 'axios';
import api from '@/utils/interceptor.ts';

//Fetch messages
export const fetchChatMessages = async(chatId: string) => {
    try {
        const response = api.get(`/api/messages/${chatId}`);
        return response;

    } catch (error) {
        console.log('Messages Fetching Failed', error);
        
    }
}

//create new message
export const sendNewMessage = async(content: string, chatId: string) => {
    try {
        const response = api.post("/api/messages",{
            content: content,
            chatId: chatId
        });

        return response;

    } catch (error) {
        console.log('Message sending Failed', error);
        
    }
}