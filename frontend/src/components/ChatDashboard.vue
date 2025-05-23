<script setup lang="ts">
    import { ref } from 'vue';
    import ChatList from '@/components/ChatList.vue';
    import ChatRoom from '@/components/ChatRoom.vue';
</script>

<template>
    <div class="flex w-full h-screen">
        <div class="w-1/3 min-h-full">
            <ChatList />
        </div>
        <div class="w-2/3 min-h-full bg-green-200">
            <ChatRoom />
        </div>
    </div>
</template>