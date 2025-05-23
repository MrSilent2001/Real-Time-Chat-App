<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';

    const emit = defineEmits(['select']);

    const props = defineProps({
        chatList: Array
    });

    const selectChat = (chat) => {
        emit('select', chat);
    }

    const userId = localStorage.getItem('userId');
</script>

<template>
  <div>
    <div v-if="!chatList.length" class="p-3 text-center">No chats yet.</div>

    <div 
        v-for="chat in chatList" :key="chat._id" 
        class="flex items-center justify-start w-full gap-5 px-8 py-3 bg-gray-100 border shadow-lg cursor-pointer border-b-gray-200"
        @click="selectChat(chat)"
    >
      <div class="flex items-center justify-center h-12 bg-blue-200 rounded-full w-14">N</div>
      <div class="flex items-center justify-between w-full">
        <p class="text-center">{{ chat.users.find((u) => u._id !== userId)?.username }}</p>
        <span class="flex items-center justify-center w-8 h-8 bg-green-300 rounded-full">1</span>
      </div>
    </div>
  </div>
</template>
