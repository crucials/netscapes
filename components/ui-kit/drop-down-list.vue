<template>
    <div class="drop-down-list-container">
        <slot/>
        <ul class="drop-down-list">
            <li v-for="item in items" :key="items.indexOf(item)" class="flex items-center gap-x-2.5 text-sm 
                w-fit hover:cursor-pointer mb-4 last:mb-0 pointer-events-none" @click="emit('item-clicked', item)">

                <img :src="'/drop-down-icons/' + item.iconFilename" :alt="item.iconAltText">
                <span class="block transition-transform duration-300">
                    {{ item.title }}
                </span>

            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { DropDownItem } from '~~/types'

    defineProps<{
        items : DropDownItem[],
    }>()
    const emit = defineEmits<{
        (event : 'item-clicked', item : DropDownItem) : void
    }>()
</script>

<style scoped>
    .drop-down-list-container {
        @apply flex items-center gap-x-1 relative hover:cursor-pointer;
    }

    .drop-down-list {
        @apply absolute p-3.5 bg-white left-0 -top-3 pointer-events-none opacity-0 min-w-[125px] 
            hover:cursor-default z-10 rounded-lg;
        transition: top 0.45s, opacity 0.3s;
        box-shadow: 0px 10px 30px 0px #00000026;
    }

    .drop-down-list li:hover span {
        @apply translate-x-1;
    }

    .drop-down-list-container:hover .drop-down-list {
        @apply top-[102%] opacity-100 pointer-events-auto;
    }

    .drop-down-list-container:hover li {
        animation-name: become-clickable;
        animation-duration: 0.2s;
        animation-fill-mode: both;
    }

    @keyframes become-clickable {
        100% {
            pointer-events: all;
        }
    }
</style>