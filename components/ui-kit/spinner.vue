<template>
    <div class="spinner" :class="`spinner-${color}-color spinner-${size}`">

    </div>
</template>

<script lang="ts" setup>
    type SpinnerColor = 'white' | 'fire'

    defineProps({
        color: {
            type: String as PropType<SpinnerColor>,
            default: 'fire'
        },

        size: {
            type: String as PropType<'small' | 'large'>,
            default: 'small'
        }
    })
</script>

<style>
    .spinner {
        @apply border-2 border-transparent rounded-full;
        animation: spinning 1s linear infinite;
    }

    .spinner-small {
        @apply w-6 h-6;
    }

    .spinner-large {
        @apply w-24 h-24;
    }

    .spinner-white-color {
        @apply border-t-white border-r-white
    }

    .spinner-fire-color {
        @apply border-t-fire border-r-fire
    }

    @keyframes spinning {
        100% {
            transform: rotate(360deg)
        }
    }
</style>