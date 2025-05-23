<script setup lang="ts">
    import {ref} from 'vue';
    import {login} from '@/api/userAPI';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const username = ref('');
    const password = ref('');

    const handleSubmit = async() => {
        try {
            const response = await login(username.value, password.value);
            
            if(response.status === 200){
                const token = response.data.user.token;
                const id = response.data.user._id;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', id);

                router.push('/chat');
            }
        } catch (error: any) {
            console.log(error);
            
        }
    }

    const goToSignup = () =>{
        router.push('/signup');
    }
</script>

<template>
  <div class="flex items-center justify-center h-screen m-auto bg-green-100">
    <div class="flex flex-col items-center justify-center w-1/2 h-auto p-8 space-y-4 bg-white shadow-xl rounded-xl">
      <h1 class="text-3xl font-bold text-center text-black">Login</h1>

      <div class="flex flex-col w-3/4 space-y-4">
        <form @submit.prevent="handleSubmit">
            <div class="my-3">
                <label for="username" class="block mb-1 font-medium">Username</label>
                <input type="text" id="username" name="username" class="w-full p-2 border border-gray-400 rounded-lg" v-model="username" required/>
            </div>
            
            <div class="my-3">
                <label for="password" class="block mb-1 font-medium">Password</label>
                <input type="password" id="password" name="password" class="w-full p-2 border border-gray-400 rounded-lg" v-model="password" required/>
            </div>

            <button class="w-full p-2 my-5 text-white bg-blue-900 rounded hover:bg-blue-700">Login</button>
            <p class="text-center">
                Don't you have an account? 
                <span class="font-semibold text-blue-600 cursor-pointer" @click="goToSignup">Signup</span>
            </p>
        </form>
      </div>
    </div>
  </div>
</template>

