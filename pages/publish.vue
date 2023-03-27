<template>
    <main class="flex px-20 justify-between gap-x-8 gap-y-12 items-center py-16
        xl:items-start m:flex-col-reverse sm:px-5" v-if="sessionInitialized">
        <div class="w-2/5 min-w-3.5 m:w-full sm:min-w-[270px]">
            <h1 class="font-bold text-4xl mb-7">
                Share your content with people
            </h1>

            <PublishForm/>
        </div>

        <img src="@/assets/images/picture-frame-illustration.png" alt="Landscapes in a picture frame"
            class="w-[35%] min-w-3.5 m:w-full m:max-w-sm sm:min-w-2">
    </main>
</template>

<script lang="ts" setup>
    const router = useRouter()

    useHead({
        title: 'Let whole world see your works - Netscapes'
    })

    const { sessionInitialized } = useSessionInitListener((account, accessToken) => {
        if(accessToken.value == '') {
            router.push('/auth')
        }
    })
</script>

<style>

</style>