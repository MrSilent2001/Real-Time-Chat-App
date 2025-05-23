<script setup lang="ts">
    import { ref, watch, onMounted, onBeforeUnmount, defineEmits } from 'vue';
    import {searchUser} from '@/api/userAPI.ts';
    import {assignChats} from '@/api/chatAPI.ts';
    
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';
    import { library } from '@fortawesome/fontawesome-svg-core';
    library.add(faMagnifyingGlass);

    const emit = defineEmits(['chatAssigned']);
    
    const search = ref('');
    const chats = ref([]);
    const showResults = ref(false);
    const containerRef = ref<HTMLElement | null>(null);

    const searchChats = async() =>{
        const response = await searchUser(search.value);
        chats.value = response.data;
        showResults.value = true;
    }

    const selectChat = async(chat) => {
        try {
            await assignChats(chat._id);
            emit('chatAssigned');
        } catch (error: any) {
            console.log(error);
        }
        showResults.value = false;
        chats.value = [];
        search.value = '';
    }

    // Watch input: clear list when input empty
    watch(search, (newVal) => {
        if (!newVal) {
            chats.value = [];
            showResults.value = false;
            search.value = '';
        }
    });

    // Hide on outside click
    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
            showResults.value = false;
            chats.value = []; 
            search.value = '';
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
    });

</script>

<template>
    <div class="w-full">
        <div ref="containerRef" class="flex flex-col gap-3 px-5 py-5 mb-2 bg-green-100 shadow-md">
            <h4 class="text-2xl font-semibold text-center">Chats</h4>
            <div class="relative">
                <input 
                    id="search"
                    type="text" 
                    name="search" 
                    placeholder="Search chats"
                    class="w-full h-10 p-3 border border-gray-400 rounded-lg"
                    v-model="search"
                    @focus="showResults = false"
                />
                <button
                    @click="searchChats"
                    class="absolute flex items-center justify-center w-10 h-10 text-black right-3 top-0.5 hover:text-gray-500"
                    >
                    <FontAwesomeIcon icon="magnifying-glass" class="text-lg" />
                </button>
            </div>
        </div>

        <!-- Search results list -->
        <div v-if="showResults && chats.length"
            class="absolute z-10 w-[500px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-sm max-h-64">
            <div 
                v-for="chat in chats" 
                :key="chat._id"
                class="p-3 border-b cursor-pointer last:border-none hover:bg-gray-100"
                @click="selectChat(chat)"
                >
                    {{ chat.username }}
            </div>
        </div>
    </div>
</template>