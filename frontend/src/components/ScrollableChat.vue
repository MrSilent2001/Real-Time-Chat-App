<script setup lang="ts">
    import {ref, watch, nextTick, defineProps} from 'vue';
    import {isSameSender, isLastMessage} from '@/utils/chatMessagesLogics.ts';

    const props = defineProps({
        chatMessages: {
            type: Array,
            required: true
        }
    });

    const container = ref<HTMLElement | null>(null);
    
    // Watch for changes in the messages array length and scroll to bottom
    watch(
        () => props.chatMessages.length,
            async () => {
                await nextTick();
                if (container.value) {
                    container.value.scrollTop = container.value.scrollHeight;
                }
            },
        { immediate: true }
    );

    const userId = localStorage.getItem('userId');
</script>

<template>
    <div ref="container" class="flex flex-col w-full h-[600px] px-4 py-2 overflow-y-scroll scrollbar-hide">

        <!-- Spacer that grows to push messages down -->
        <div class="flex-grow"></div>
        
        <div v-for="(msg, index) in chatMessages" :key="msg._id" class="flex items-end gap-2 mb-2"
            :class="msg.sender._id === userId ? 'justify-end' : 'justify-start'"
        >
            <!-- Message bubble -->
            <p 
                class="px-3 py-1 text-white rounded-xl w-max max-w-[75%] break-words whitespace-pre-wrap"
                :class="msg.sender._id === userId ? 'bg-red-500' : 'bg-blue-500'"
            >
                {{ msg.content }}
            </p>

            <!-- Profile icon only for receiver, only if it's the last message or sender changes -->
            <!-- <div
                v-if="msg.sender._id !== userId && (isSameSender(chatMessages, msg, index, userId) || isLastMessage(chatMessages, index, userId))"
                class="flex items-center justify-center w-8 h-8 text-sm bg-blue-200 rounded-full"
            >
                N
            </div> -->

        </div>
    </div>
</template>
