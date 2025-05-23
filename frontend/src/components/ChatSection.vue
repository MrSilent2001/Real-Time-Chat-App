<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faPaperPlane  } from '@fortawesome/free-solid-svg-icons';
    import { library } from '@fortawesome/fontawesome-svg-core';
    library.add(faPaperPlane );
    import {sendNewMessage, fetchChatMessages} from '@/api/messageAPI.ts';
    import ScrollableChat from '@/components/ScrollableChat.vue';
    import {ref, watch, onMounted} from 'vue';
    import { useChatStore } from '@/stores/chatStore';
    import { storeToRefs } from 'pinia';

    const chatStore = useChatStore();
    const { selectedChat } = storeToRefs(chatStore);
    // import { io, Socket } from 'socket.io-client';
    // const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // const socket = ref<Socket | null>(null);
    // const selectedChatCompare = ref<string>('');

    // onMounted(() => {
    //     socket.value = io(BASE_URL);

    //     socket.value.on("connect", () => {
    //         console.log("Connected to socket server: ", socket.value?.id);
    //     });

    //     socket.value.on("receive-message", (data: string) => {
    //         console.log("Received message: ", data);
    //     });  
    // });

    const newMessage = ref('');
    const chatMessages = ref([]);

    const sendMessage = async() =>{  
        try {
            const response = await sendNewMessage(newMessage.value, selectedChat.value._id);
            console.log(response);
            chatMessages.value.push(response.data);
            newMessage.value = '';
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMessages = async() => {
        try {
            const response = await fetchChatMessages(selectedChat.value._id);
            chatMessages.value = response.data;
            console.log(chatMessages.value);
            
        } catch (error) {
            console.log(error);
        }
    }

    //fetch chat messages when a chat selected
    watch(selectedChat, (newChat) => {
        if (newChat && newChat._id) {
            fetchMessages();
        } else {
            chatMessages.value = []; 
        }
    }, { immediate: true });

</script>

<template>
    <div 
        class="flex flex-col w-full"
        v-if="selectedChat"
    >
        <div class="flex items-center justify-center bg-blue-100 shadow-xl h-[599px]">
            <ScrollableChat :chatMessages="chatMessages"/>
        </div>
        <div class="flex items-center justify-between bg-green-200 h-[75px] px-5 gap-5">
            <div class="flex w-full gap-3">
                <input 
                    v-model="newMessage"
                    id="search"
                    type="text" 
                    name="search" 
                    placeholder=""
                    class="w-full h-10 p-3 border border-gray-300 rounded-xl"
                    @keydown.enter="sendMessage"
                />
                <button 
                    class="text-gray-800 hover:text-gray-400"
                    @click="sendMessage"
                >
                    <FontAwesomeIcon :icon="['fas', 'paper-plane']" class="text-lg" />
                </button>
            </div>
        </div>
    </div>

    <div 
        v-else
        class="flex flex-col items-center justify-center w-full h-screen"
    >
        <p>No Chat Selected</p>
    </div>
</template>