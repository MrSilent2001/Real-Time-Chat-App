import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chatStore', () => {
  const selectedChat = ref(null);

  function setSelectedChat(chat) {
    selectedChat.value = chat;
  }

  return { selectedChat, setSelectedChat };
});
