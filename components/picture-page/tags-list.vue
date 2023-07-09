<template>
    <ul class="flex gap-3 flex-wrap">
        <li v-for="tag in tags">
            <a :href="`/search?query=${tag}`" class="block px-6 py-1.5 rounded-lg border-neutral-300 border font-medium 
                transition-border duration-300 hover:border-fire">
                {{ tag }}
            </a>
        </li>
    </ul>
</template>

<script lang="ts" setup>
    defineProps<{
        tags : string[]
    }>()
</script>

<style scoped>

</style>