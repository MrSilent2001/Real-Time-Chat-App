<script setup lang="ts">
    import { defineProps } from 'vue';
    import { useChatStore } from '@/stores/chatStore';
    import Avatar from '@/components/Avatar.vue';

    const chatStore = useChatStore();
    const userId = localStorage.getItem('userId');

    const props = defineProps({
        chatList: Array
    });

    const selectChat = (chat) => {
      chatStore.setSelectedChat(chat);
    }

    
</script>

<template>
  <div>
    <div v-if="!chatList.length" class="p-3 text-center">No chats yet.</div>

    <div 
        v-for="chat in chatList" :key="chat._id" 
        class="flex items-center justify-start w-full gap-10 px-8 py-3 bg-gray-100 border shadow-lg cursor-pointer border-b-gray-200"
        @click="selectChat(chat)"
    >
      <Avatar/>

      <div class="flex flex-col w-full items-left">
        <p class="text-lg font-semibold">{{ chat.users.find((u) => u._id !== userId)?.username }}</p>
        <div class="flex ">
          <p class="text-xs">{{chat.users.find((u) => u._id == userId)?.username}}: {{ chat.latestMessage.content }}</p>
        </div>
        <!-- <span class="flex items-center justify-center w-8 h-8 bg-green-300 rounded-full">1</span> -->
      </div>

    </div>
  </div>
</template>
