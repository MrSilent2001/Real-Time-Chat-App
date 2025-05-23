<script setup lang="ts">
    import {ref, watch, onMounted, onBeforeUnmount} from 'vue';
    import { useChatStore } from '@/stores/chatStore';
    import { storeToRefs } from 'pinia';

    import {sendNewMessage, fetchChatMessages} from '@/api/messageAPI.ts';
    import ScrollableChat from '@/components/ScrollableChat.vue';

    import SocketioService from '@/services/socket.io.ts';
    
    const chatStore = useChatStore();
    const { selectedChat } = storeToRefs(chatStore);

    const newMessage = ref('');
    const chatMessages = ref([]);

    const sendMessage = async() =>{  
        try {
            const response = await sendNewMessage(newMessage.value, selectedChat.value._id);
            console.log(response);
            SocketioService.sendMessage(response.data);
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

                // Connect socket when chat selected
                SocketioService.joinRoom(newChat._id);                
            } else {
                chatMessages.value = []; 
            }
        }, 
        { immediate: true }
    );

    onMounted(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            SocketioService.setupSocketConnection(userId);
        }
        
        SocketioService.onMessageReceived((newMessage: any) => {
            console.log('Message received via socket:', newMessage);

            // Only push if it's for the currently selected chat
            if (selectedChat.value && newMessage.chat._id === selectedChat.value._id) {
                chatMessages.value.push(newMessage);
            }
        });
    });

    onBeforeUnmount(() => {
        SocketioService.disconnect();
    });

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
                    <font-awesome-icon icon="paper-plane" class="text-lg" />
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