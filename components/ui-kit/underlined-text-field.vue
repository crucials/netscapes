<template>
    <input type="text" class="bg-transparent placeholder:text-neutral-400 p-2.5 focus:outline-none transition-border 
        duration-300 border-b-neutral-700 border-b-2 focus:border-fire text-base min-w-[230px]" 
        :value="modelValue" 
        @input="(event : Event) => $emit('update:modelValue', (event.target as HTMLInputElement).value)">
</template>

<script lang="ts" setup>
    defineProps<{
        modelValue : string
    }>()
</script>

<style>

</style>