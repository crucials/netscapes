<template>
    <NuxtLink class="collection-item" :to="`/collections/${collection.id}`">
        <div class="collection-thumbnail"></div>
        
        <span class="3xl:text-lg">
            {{ collection.name }}
        </span>
    </NuxtLink>
</template>

<script lang="ts" setup>
    import { CollectionItem } from '~~/types'

    const props = defineProps<{
        collection : CollectionItem
    }>()

    const DEFAULT_THUMBNAIL_URL = 'url(/collection-default-thumbnail.svg)'

    /* const thumbnailInvalid = ref(false)

    if(!props.collection.thumbnailUrl) {
        thumbnailInvalid.value = true
    }
    else {
        const { imageBroken } = useFallbackImage(props.collection.thumbnailUrl, () => {
            thumbnailInvalid.value = imageBroken.value
        })
    } */

    const thumbnailUrl = ref(DEFAULT_THUMBNAIL_URL)

    if(props.collection.thumbnailUrl) {
        const { imageBroken } = useFallbackImage(props.collection.thumbnailUrl, () => {
            if(!imageBroken.value) {
                thumbnailUrl.value = `url(${props.collection.thumbnailUrl})`
            }
        })
    }
</script>

<style scoped>
    .collection-item {
        @apply w-[45%] min-w-2 sm:w-full;
    }

    .collection-thumbnail {
        @apply w-full aspect-video rounded-2xl overflow-hidden mb-2;
        background-image: v-bind(thumbnailUrl);
        background-size: 100% 100%;
        background-position: center center;
        transition: background-size 0.3s ease-in;
    }

    .collection-item:hover .collection-thumbnail {
        background-size: 115% 115%;
    }
</style>