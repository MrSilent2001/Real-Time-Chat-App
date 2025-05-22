<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faPaperPlane  } from '@fortawesome/free-solid-svg-icons';
    import { library } from '@fortawesome/fontawesome-svg-core';

    library.add(faPaperPlane )
</script>

<template>
    <div class="flex flex-col w-full">
        <div class="flex items-center justify-center bg-blue-100 shadow-xl h-[599px]">
            <p>hi</p>
        </div>
        <div class="flex items-center justify-between bg-green-200 h-[75px] px-5 gap-5">
            <input 
                id="search"
                type="text" 
                name="search" 
                placeholder=""
                class="w-full h-10 p-3 border border-gray-300 rounded-xl"
            />
            <button class="text-gray-800 hover:text-gray-400">
                <FontAwesomeIcon :icon="['fas', 'paper-plane']" class="text-lg" />
            </button>
        </div>
    </div>
</template>