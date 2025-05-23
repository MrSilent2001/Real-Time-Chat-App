<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import ChatListHeader from '@/components/ChatListHeader.vue';
    import Chat from '@/components/Chat.vue';
    import { fetchChats } from '@/api/chatAPI.ts';
    import { defineEmits } from 'vue';

    const emit = defineEmits(['chat-selected']);
    const chatList = ref([]);

    const fetchChatLists = async () => {
        const response = await fetchChats();
        chatList.value = response.data;
    };

    onMounted(() => {
        fetchChatLists();
    });

    const onChatAssigned = () => {
        fetchChatLists();
    };

    const onChatSelected = (chat) => {
        emit('chat-selected', chat);
    }
</script>

<template>
  <div class="w-full gap-1">
    <ChatListHeader @chatAssigned="onChatAssigned" />
    <Chat :chat-list="chatList" @select="onChatSelected" />
  </div>
</template>
