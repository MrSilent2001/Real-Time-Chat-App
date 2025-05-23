<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import ion from 'socket.io-client';
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const socket = ref('');
    const selectedChatCompare = ref('');

    onMounted(
        const socket = io(BASE_URL);
    );

</script>

<template></template>