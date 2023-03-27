<template>
    <PicturesBoardWrapper>
        <PicturesBoard :pictures="foundPictures"/>

        <div v-if="!loading && foundPictures.length == 0">
            <img src="@/assets/images/empty-box.svg" alt="Empty box" class="mx-auto w-52 mb-6">

            <h2 class="font-bold text-3xl text-center mb-4">
                No pictures found
            </h2>

            <p class="text-lg text-center">
                Check the search field for typos and try again
            </p>
        </div>

        <Spinner v-if="loading" size="large" class="mx-auto"/>
    </PicturesBoardWrapper>
</template>

<script lang="ts" setup>
    import { searchPictures } from '~~/api'
    import { useSearchQueryStore } from '~~/stores/search-query'
    import { FeedPicture } from '~~/types'

    const router = useRouter()

    const { searchQuery } = storeToRefs(useSearchQueryStore())
    const foundPictures = ref<FeedPicture[]>([])
    const loading = ref(true)

    search()

    watch(searchQuery, () => {
        search()
    })

    async function search() {
        const trimmedQuery = searchQuery.value.trim()

        useHead({ title: trimmedQuery + ' - Netscapes' })

        if(trimmedQuery.length == 0) {
            router.push('/feed')
            return
        }

        loading.value = true
        foundPictures.value = await searchPictures(searchQuery.value)
        loading.value = false
    }
</script>

<style>

</style>