import axios from 'axios';
import api from '@/utils/interceptor.ts';

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
            }
        });

        return response;

    } catch (error) {
        console.log('Search Failed', error);
        
    }
}