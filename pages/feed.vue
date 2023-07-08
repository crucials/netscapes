<template>
    <PicturesBoardWrapper>
        <PicturesBoard :pictures="pictures"/>
    </PicturesBoardWrapper>
</template>

<script lang="ts" setup>
    import { getPictures } from '~~/api'
    import { FeedPicture } from '~~/types'

    useHead({
        title: 'Browse pictures - Netscapes'
    })

    const pictures = ref<FeedPicture[]>([])

    onMounted(() => {
        useSessionInitListener(async (account, accessToken) => {
            const accessTokenValue = accessToken.value
            if(accessTokenValue != '') {
                pictures.value = await getPictures(accessTokenValue)
            }
            else {
                pictures.value = await getPictures()
            }
        })
    })
</script>

<style scoped>
    
</style>