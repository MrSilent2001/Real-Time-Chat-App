<script setup lang="ts">
    import ChatRoomHeader from '@/components/ChatRoomHeader.vue';
    import ChatSection from '@/components/ChatSection.vue';
    import { defineProps } from 'vue';

    const props = defineProps<{
        selectedChat: any
    }>();
</script>

<template>
    <div>
        <ChatRoomHeader :selected-chat="selectedChat"/>
        <ChatSection/>
    </div>
</template>