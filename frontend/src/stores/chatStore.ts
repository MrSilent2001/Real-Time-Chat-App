import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chatStore', () => {
  const selectedChat = ref(null);

  const setSelectedChat = (chat) => {
    selectedChat.value = chat;
  };

  return { selectedChat, setSelectedChat };
});
