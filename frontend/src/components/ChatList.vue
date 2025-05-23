<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import ChatListHeader from '@/components/ChatListHeader.vue';
    import Chat from '@/components/Chat.vue';
    import { fetchChats } from '@/api/chatAPI.ts';

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

</script>

<template>
  <div class="w-full gap-1">
    <ChatListHeader @chatAssigned="onChatAssigned" />
    <Chat :chat-list="chatList" />
  </div>
</template>
