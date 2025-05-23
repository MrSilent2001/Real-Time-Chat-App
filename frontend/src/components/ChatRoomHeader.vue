<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { useChatStore } from '@/stores/chatStore';
    import { storeToRefs } from 'pinia';
    
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
    import { library } from '@fortawesome/fontawesome-svg-core';
    library.add(faRightFromBracket);

    const router = useRouter();
    
    const chatStore = useChatStore();
    const { selectedChat } = storeToRefs(chatStore);

    const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    }
    
</script>

<template>
    <div 
        class="relative w-full px-3 py-2 shadow-lg bg-gray-50"
    >
        <div class="flex items-center justify-between px-10">
            <p 
                class="text-xl text-center"
                v-if="selectedChat"
            >
                    {{ selectedChat.users.find((u) => u._id !== userId)?.username }}
            </p>
            <div class="flex items-center justify-end h-12 gap-10">
                <div
                    class="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full "
                    v-if="selectedChat"
                >
                    N
                </div>
                <button 
                    class="absolute text-black hover:text-gray-500 right-3"
                    @click="handleLogout"
                >
                    <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" class="text-lg" />
                </button>
            </div>
        </div>
    </div>
</template>