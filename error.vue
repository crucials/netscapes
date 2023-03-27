<template>
    <NuxtLayout name="root">
        <main class="flex-grow flex flex-col justify-center items-center">
            <img src="@/assets/images/broken-crayon.png" alt="Broken crayon illustration" class="mb-9">

            <h1 class="font-bold text-4xl mb-5 text-center xs:text-3xl">
                {{ error.statusCode == 404 ? 'Page not found' : 'Something went wrong' }}
            </h1>

            <p class="text-xl text-center mb-6 xs:text-lg" v-if="error.statusCode >= 500">
                Perhaps we are experiencing some issues right now. Try again later
            </p>

            <NuxtLink to="/feed">
                <FilledButton>
                    Go to feed
                </FilledButton>
            </NuxtLink>
        </main>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    import { NuxtError } from '#app'

    defineProps<{
        error : NuxtError
    }>()
</script>

<style>

</style>