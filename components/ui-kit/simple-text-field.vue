<template>
    <Component :is="multiline ? 'textarea' : 'input'" class="px-5 py-3 bg-neutral-100 placeholder:text-neutral-400
        rounded-xl focus:outline-none transition-border border border-neutral-300 focus:border-fire" 
        :value="modelValue" 
        @input="(event : Event) => $emit('update:modelValue', (event.target as HTMLInputElement).value)"/>
</template>

<script lang="ts" setup>
    withDefaults(defineProps<{
        multiline? : boolean,
        modelValue : string
    }>(), { multiline: false })
</script>

<style>

</style>