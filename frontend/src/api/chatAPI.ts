import axios from 'axios';
import api from '@/utils/interceptor.ts';

//Fetch chats
export const fetchChats = async() => {
    try {
        const response = api.get("/api/chats");
        return response;

    } catch (error) {
        console.log('Chat Fetching Failed', error);
        
    }
}

//create Chats
export const assignChats = async(userId: string) => {
    try {
        const response = api.post("/api/chats",{
            userId: userId
        });

        return response;

    } catch (error) {
        console.log('Chat Fetching Failed', error);
        
    }
}