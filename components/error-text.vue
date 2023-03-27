<template>
    <Transition name="error-text">
        <p class="text-fire-dark overflow-hidden mt-3" v-if="visible">
            {{ errorText }}
        </p>
    </Transition>
</template>

<script lang="ts" setup>
    defineProps<{
        errorText : string,
        visible : boolean
    }>()
</script>

<style scoped>
    .error-text-enter-active, .error-text-leave-active {
        transition: opacity 0.7s, transform 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
        @apply origin-left;
    }

    .error-text-enter-from, .error-text-leave-to {
        @apply scale-x-0 opacity-0;
    }
</style>