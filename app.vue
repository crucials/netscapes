<template>
    <NuxtLayout name="root">
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    useHead({
        title: 'Netscapes'
    })
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap');

    * {
        @apply font-rubik selection:bg-fire selection:text-white
    }
</style>