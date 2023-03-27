<template>
    <details class="spoiler" @toggle="opened = !opened">
        <summary class="flex gap-x-4 items-center transition-all" 
            :class="{ 'mb-8': opened }">

            <slot name="summary"></slot>
            <img src="@/assets/images/spoiler-icon.svg" :alt="opened ? 'Down arrow' : 'Right arrow'"
                class="transition-transform duration-300" :class="{ 'rotate-90': opened }">

        </summary>
        
        <slot name="hidden-content"></slot>
    </details>
</template>

<script lang="ts" setup>
    const opened = ref(false)
</script>

<style scoped>
    
</style>