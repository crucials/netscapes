<template>
    <figure class="card">
        <img :src="picture.imageUrl" :alt="picture.title" class="w-full" v-if="!imageBroken">
        <img src="@/assets/images/picture-fallback.svg" alt="No picture" class="w-full" v-else>

        <NuxtLink :to="`/pictures/${picture.id}`" class="absolute w-full h-full top-0 left-0"></NuxtLink>

        <figcaption class="picture-info" @click.prevent>
            <NuxtLink :to="'/pictures/' + picture.id" class="inline-block mb-1 mx-auto">
                {{ picture.title }}
            </NuxtLink>

            <FilledButton color="white" class="block mx-auto" @click="save" :loading="savingInProcess"
                :disabled="saveButtonText == 'Saved'">
                {{ saveButtonText }}
            </FilledButton>
        </figcaption>
    </figure>
</template>

<script lang="ts" setup>
    import { addPictureToCollection } from '~~/api';
import { useSessionStore } from '~~/stores/session'
    import { FeedPicture } from '~~/types'

    const props = defineProps<{
        picture : FeedPicture
    }>()

    const router = useRouter()

    const { imageBroken } = useFallbackImage(props.picture.imageUrl)
    const { accessToken, account } = storeToRefs(useSessionStore())

    const savingInProcess = ref(false)
    const saveButtonText = ref('Save')

    async function save() {
        if(accessToken.value == '' || !account.value) {
            router.push('/auth')
            return
        }

        savingInProcess.value = true

        const defaultCollectionId = account.value.collections[0].id
        try {
            await addPictureToCollection(accessToken.value, props.picture.id, defaultCollectionId)
            saveButtonText.value = 'Saved'
        }
        catch(error) {} // Should notify user about error, will be implemented in future

        savingInProcess.value = false
    }
</script>

<style scoped>
    .card {
        @apply rounded-2xl overflow-hidden relative;
    }

    .picture-info {
        @apply w-full absolute p-2 bg-[#00000065] -bottom-full left-0 text-white text-center 
            font-normal transition-[bottom] duration-[450ms] hover:cursor-default;
    }

    .card:hover .picture-info {
        @apply bottom-0;
    }

    @media (hover: none) {
        .picture-info {
            @apply bottom-0;
        }
    }
</style>