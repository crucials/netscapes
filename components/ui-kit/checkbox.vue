<template>
    <label class="block w-fit">
        <input type="checkbox" class="rounded-lg accent-fire mr-1" 
            @change="(event : Event) => $emit('update:modelValue', (event.target as HTMLInputElement).checked)"
            :checked="modelValue">
        <slot></slot>
    </label>
</template>

<script lang="ts" setup>
    defineProps<{
        modelValue : boolean
    }>()
</script>

<style>

</style>