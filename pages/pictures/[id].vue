<template>
    <main class="py-14 px-5">
        <DeleteModal :picture-id="pictureId" :delete-modal-opened="deleteModalOpened" 
            @window-closed="deleteModalOpened = false" @picture-deleted="router.push('/feed')"/>

        <section class="flex justify-around gap-10 items-start lg:flex-col mb-40">
            <div class="w-[38%] rounded-2xl shadow-soft-xl overflow-hidden min-w-4 lg:max-w-lg lg:w-full
                sm:min-w-2.5">
                <img :src="picture?.imageUrl" :alt="picture?.title" v-show="!imageBroken" class="w-full">
                <img src="@/assets/images/picture-fallback.svg" alt="No picture" class="w-full" v-show="imageBroken">
            </div>

            <div class="w-2/5 lg:w-full">
                <h1 class="font-bold text-3xl mb-2 sm:text-2xl">
                    {{ picture?.title }}
                </h1>

                <p class="text-neutral-400 mb-4 sm:text-sm">
                    Posted by 
                    <NuxtLink :to="`/accounts/${picture?.author.id}`" class="transition-colors duration-300 
                        text-fire hover:text-fire-light">
                        {{ accountOwns ? 'You' : picture?.author.username }}
                    </NuxtLink>
                </p>

                <p class="text-black text-lg mb-6 sm:text-base">
                    {{ picture?.description }}
                </p>

                <div class="flex gap-7 mb-8 flex-wrap xs:flex-col">
                    <FilledButton @click="download" class="">
                        Download
                    </FilledButton>

                    <OutlinedButton v-if="accountOwns" @click="deleteModalOpened = true">
                        Delete
                    </OutlinedButton>

                    <CollectionsDropDown :picture-id="pictureId"/>
                </div>

                <TagsList :tags="picture?.tags || []" class="mb-8"/>

                <hr class="border-neutral-300 mb-8">

                <h3 class="text-2xl text-black font-normal mb-4 sm:text-xl">
                    Comments
                </h3>

                <div class="mb-12" v-if="picture?.comments && picture.comments.length > 0">
                    <PictureComment v-for="comment in picture?.comments" :comment="comment" 
                        class="mb-7 last:mb-0"/>
                </div>

                <img src="@/assets/images/comment-placeholder.svg" alt="No comments" class="mb-12" v-else>

                <CommentForm :target-picture-id="pictureId" @comment-posted="refresh()"/>
            </div>
        </section>

        <section>
            <h2 class="font-bold text-2xl mb-12 pl-20 2xl:pl-18 xl:pl-16 m:pl-6 lg:pl-0">
                Other pictures
            </h2>

            <PicturesBoard :pictures="otherPictures"/>
        </section>
    </main>
</template>

<script lang="ts" setup>
    import JsFileDownloader from 'js-file-downloader'
    import { API_BASE_URL, getPictureById, getPictures } from '~~/api'
    import { Picture } from '~~/types'


    const pictureId = +useRoute().params.id

    const { data: picture, refresh } = await useFetch<Picture>(`${API_BASE_URL}/pictures/${pictureId}`)
    const otherPictures = ref<Picture[]>([])
    if(!picture.value) {
        throw createError({ statusCode: 404, message: 'Picture not found' })
    }
    
    const accountOwns = ref(false) // Specifies if current account is author of this picture
    
    useHead({
        title: picture.value.title + ' - Netscapes'
    })
    const { imageBroken } = useFallbackImage(picture.value.imageUrl)

    const deleteModalOpened = ref(false)   
    const router = useRouter() 
    

    function download() {
        if(picture.value) {
            new JsFileDownloader({ url: picture.value?.imageUrl })
        }
    }

    onMounted(() => {
        useSessionInitListener(async (account, accessToken) => {
            if(accessToken.value != '') {
                try {
                    // Query picture again for updating account last viewed tags statistic
                    getPictureById(pictureId, accessToken.value)

                    const allPictures = await getPictures(accessToken.value)
                    otherPictures.value = allPictures.filter(pictureFromApi => pictureFromApi.id !== picture.value?.id)

                    if(account.value?.username == picture.value?.author.username) {
                        accountOwns.value = true
                    }
                }
                catch(error) {}
            }
            else {
                otherPictures.value = (await getPictures()).filter(pictureFromApi => {
                    return pictureFromApi.id !== picture.value?.id
                })
            }
        })
    })
</script>

<style scoped>
    .picture-page-enter-active, .picture-page-leave-active {
        transition: all 0.4s;
    }

    .picture-page-enter-from, .picture-page-leave-to {
        transform: translateX(100%);
    }
</style>