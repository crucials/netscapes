<template>
    <main class="p-16">
        <h1 class="text-5xl flex items-center gap-x-4 mb-10">
            <img src="@/assets/images/stacked-pictures.svg" alt="Stacked pictures icon">
            {{ collection?.name }}
        </h1>

        <div class="flex justify-center gap-x-10 flex-wrap items-start gap-y-6">
            <PictureCard v-for="picture in collection?.savedPictures" :key="picture.id" 
                :picture="picture" class="w-1/5 min-w-2.5"/>
        </div>

        <p class="text-3xl text-center my-9" v-if="collection?.savedPictures.length == 0">
            No pictures yet
        </p>
    </main>
</template>

<script lang="ts" setup>
    import { API_BASE_URL } from '~~/api'
    import { Collection } from '~~/types'

    const collectionId = +useRoute().params.id

    const { data: collection } = await useFetch<Collection>(`${API_BASE_URL}/collections/${collectionId}`)
    
    if(!collection.value) {
        throw createError({ statusCode: 404, message: 'Collection not found' })
    }

    useHead({
        title: collection.value.name + '  - Netscapes'
    })
</script>

<style>

</style>