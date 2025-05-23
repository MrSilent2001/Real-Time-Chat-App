import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem("token");

//Fetch chats
export const fetchChats = async() => {
    try {
        const response = api.get("/api/chats",{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

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
        },{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        console.log('Chat Fetching Failed', error);
        
    }
}