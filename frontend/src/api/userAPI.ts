import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem("token");

//login
export const login = async(username: string, password: string) => {
    try {
        const response = api.post("/api/users/login",{
            username,
            password
        });

        return response;
    } catch (error) {
        console.log('Login Failed', error);
        
    }
}

//signup
export const signup = async(username: string, email: string, password: string) => {
    try {
        const response = api.post("/api/users/signup",{
            username,
            email,
            password
        });

        return response;
    } catch (error) {
        console.log('Signup Failed', error);
        
    }
}

//search
export const searchUser = async(search: string) => {
    try {
        const response = api.get("/api/users",{
            params: { 
                search 
            },
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        console.log('Search Failed', error);
        
    }
}