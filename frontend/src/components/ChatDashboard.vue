<script setup lang="ts">
    import { ref } from 'vue';
    import ChatList from '@/components/ChatList.vue';
    import ChatRoom from '@/components/ChatRoom.vue';

    const selectedChat = ref('');
    const handleChatSelected = (chat) => {
        selectedChat.value = chat;
    };
</script>

<template>
    <div class="flex w-full h-screen">
        <div class="w-1/3 min-h-full">
            <ChatList @chat-selected="handleChatSelected"/>
        </div>
        <div class="w-2/3 min-h-full bg-green-200">
            <ChatRoom :selected-chat="selectedChat"/>
        </div>
    </div>
</template>