<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
    import { library } from '@fortawesome/fontawesome-svg-core'

    library.add(faRightFromBracket)
</script>

<template>
    <div class="w-full px-3 py-2 shadow-lg bg-gray-50">
        <div class="flex items-center justify-between px-10">
            <p class="text-xl text-center">Name</p>
            <div class="flex items-center justify-end gap-10">
                <div class="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full ">N</div>
                <button class="text-black hover:text-gray-500">
                    <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" class="text-lg" />
                </button>
            </div>
        </div>
    </div>
</template>