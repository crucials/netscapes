<template>
    <CreateCollectionModal :opened="createCollectionModalOpened" 
        @window-closed="createCollectionModalOpened = false" 
        @collection-created="$emit('collection-created')"/>

    <section class="w-5/12 lg:w-full" v-if="windowWidth > 768">
        <div class="flex items-center gap-x-4 mb-8">
            <h2 class="font-bold text-3xl">
                Collections
            </h2>

            <button v-if="currentAccount?.id == account.id" @click="openCreateCollectionModal">
                <img src="@/assets/images/plus.svg" alt="Plus sign icon">
            </button>
        </div>

        <ul class="flex gap-6 items-start flex-wrap">
            <CollectionItem v-for="collection in account.collections" :key="collection.id" 
                :collection="collection"/>
        </ul>
    </section>

    <Spoiler class="w-5/12 lg:w-full" v-else>
        <template v-slot:summary>
            <div class="flex items-center gap-x-4">
                <h2 class="font-bold text-3xl">
                    Collections
                </h2>

                <button v-if="currentAccount?.id == account.id" @click="openCreateCollectionModal">
                    <img src="@/assets/images/plus.svg" alt="Plus sign icon">
                </button>
            </div>
        </template>

        <template v-slot:hidden-content>
            <ul class="flex gap-6 items-start flex-wrap">
                <CollectionItem v-for="collection in account.collections" :key="collection.id" 
                    :collection="collection"/>
            </ul>
        </template>
    </Spoiler>
</template>

<script lang="ts" setup>
    import { useSessionStore } from '~~/stores/session'
    import { ExtendedAccountInfo } from '~~/types'

    defineProps<{
        account : ExtendedAccountInfo
    }>()

    const router = useRouter()

    const { accessToken, account: currentAccount } = storeToRefs(useSessionStore())
    const { windowWidth } = useWindowWidth()
    const createCollectionModalOpened = ref(false)

    function openCreateCollectionModal() {
        if(accessToken.value == '') {
            router.push('/auth')
        }
        else {
            createCollectionModalOpened.value = true
        }
    }
</script>

<style>

</style>