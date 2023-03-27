<template>
    <button class="outlined-button">
        <slot v-if="!loading"></slot>
        <Spinner v-else/>
    </button>
</template>

<script lang="ts" setup>
    withDefaults(defineProps<{
        loading? : boolean
    }>(), { loading: false })   
</script>

<style scoped>
    .outlined-button {
        @apply text-fire px-9 py-2.5 bg-white border-2 border-fire rounded-xl transition-colors 
        duration-300 hover:bg-fire hover:text-white
    }

    .outlined-button:hover div {
        @apply border-b-white border-r-white
    }
</style>