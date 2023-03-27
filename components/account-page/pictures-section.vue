<template>
    <section class="w-5/12 lg:w-full" v-if="windowWidth > 768">
        <div class="flex items-center gap-x-4 mb-8">
            <h2 class="font-bold text-3xl">
                Pictures
            </h2>

            <NuxtLink v-if="currentAccount?.id == account.id" to="/publish">
                <img src="@/assets/images/plus.svg" alt="Plus sign icon">
            </NuxtLink>
        </div>

        <div class="flex gap-x-3 gap-y-8 items-start flex-wrap justify-between">
            <PictureCard v-for="picture in account.publishedPictures" :key="picture.id"
                :picture="picture" class="w-[46%] min-w-2.5 lg:w-full"/>
        </div>
    </section>

    <Spoiler class="w-5/12 lg:w-full" v-else>
        <template v-slot:summary>
            <div class="flex items-center gap-x-4">
                <h2 class="font-bold text-3xl">
                    Pictures
                </h2>

                <NuxtLink v-if="currentAccount?.id == account.id" to="/publish">
                    <img src="@/assets/images/plus.svg" alt="Plus sign icon">
                </NuxtLink>
            </div>
        </template>

        <template v-slot:hidden-content>
            <div class="flex gap-x-3 gap-y-8 items-start flex-wrap justify-between">
                <PictureCard v-for="picture in account.publishedPictures" :key="picture.id"
                    :picture="picture" class="w-[46%] min-w-2.5 lg:w-full"/>
            </div>
        </template>
    </Spoiler>
</template>

<script lang="ts" setup>
    import { useSessionStore } from '~~/stores/session'
    import { ExtendedAccountInfo } from '~~/types'

    defineProps<{
        account : ExtendedAccountInfo
    }>()

    const { account: currentAccount } = storeToRefs(useSessionStore())
    const { windowWidth } = useWindowWidth()
</script>

<style>

</style>