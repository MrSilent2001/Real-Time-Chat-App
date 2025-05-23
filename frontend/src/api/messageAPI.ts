import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem("token");

//Fetch messages
export const fetchChatMessages = async(chatId: string) => {
    try {
        const response = api.get(`/api/messages/${chatId}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

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
        },{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        console.log('Message sending Failed', error);
        
    }
}