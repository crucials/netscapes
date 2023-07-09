<template>
    <main class="main-content-wrapper">
        <slot></slot>
    </main>
</template>

<script lang="ts" setup>

</script>

<style scoped>
    .main-content-wrapper {
        @apply py-[73px] px-9 flex-grow sm:px-4;
        background-image: url('@/assets/images/feed-page-bg-pattern.svg');
        background-size: max(100%, 1100px) auto;
    }
</style>