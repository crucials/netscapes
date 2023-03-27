<template>
    <button class="filled-button" :class="`${color}-filled-button`">
        <slot v-if="!loading"></slot>
        <Spinner v-else :color="color == 'fire' ? 'white' : 'fire'"/>
    </button>
</template>

<script lang="ts" setup>
    withDefaults(defineProps<{
        loading? : boolean,
        color? : string
    }>(), { loading: false, color: 'fire' })
</script>

<style scoped>
    .filled-button {
        @apply px-9 py-2.5 rounded-xl transition-all duration-300
    }

    .fire-filled-button {
        @apply text-white bg-fire hover:bg-fire-light;
    }

    .white-filled-button {
        @apply bg-white text-fire disabled:bg-white/80;
    }

    .white-filled-button:hover {
        box-shadow: 0px 0px 30px 1px #F6474080;
    }
</style>