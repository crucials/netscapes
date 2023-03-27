<template>
    <div class="min-h-screen flex flex-col overflow-hidden">
        <NavigationBar :opened-on-mobile="navigationOpenedOnMobile" @closed="navigationOpenedOnMobile = false"/>
        <button class="hidden absolute top-3 right-3 z-20 transition-all duration-300 m:block" 
            :class="{ 'menu-button-opened': navigationOpenedOnMobile }"
            @click="navigationOpenedOnMobile = !navigationOpenedOnMobile">
            <img src="@/assets/images/menu.svg" alt="Three lines">
        </button>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
    const navigationOpenedOnMobile = ref(false)
</script>

<style scoped>
    .menu-button-opened {
        @apply fixed scale-110 top-6 right-6;
    }
</style>