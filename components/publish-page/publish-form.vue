<template>
    <form @submit.prevent="">
        <div class="flex items-center gap-6 mb-6 xs:flex-col xs:items-start">
            <p class="text-lg">
                1. Upload the image
            </p>

            <div>
                <UploadFileButton :class="{ 'mb-2': formData.imageFile }" 
                    @file-uploaded="file => formData.imageFile = file"/>
                <span class="block text-fire text-sm max-w-[200px] truncate" :title="formData.imageFile?.name">
                    {{ formData.imageFile?.name }}
                </span>
            </div>
        </div>

        <label class="block mb-8">
            <p class="text-lg mb-6">
                2. Write the title and description
            </p>

            <SimpleTextField v-model.trim="formData.title" class="w-2/3 mb-5 sm:w-full" type="text" placeholder="Title"/>
            <SimpleTextField v-model.trim="formData.description" class="w-2/3 sm:w-full" placeholder="Description"
                multiline rows="4"/>
        </label>

        <label class="block mb-11">
            <p class="text-lg mb-6">
                3. Add some tags that describe your post
            </p>

            <TagsField v-model="formData.tags"/>
        </label>

        <FilledButton type="button" @click="publish" class="mb-3" :loading="loading">
            Publish
        </FilledButton>

        <ErrorText :error-text="errorText" :visible="errorTextVisible"/>
    </form>
</template>

<script lang="ts" setup>
    import { addPicture } from '~~/api';
    import { ImageStorageClient, ImageStorageClientError } from '~~/image-storage-client'
    import { useSessionStore } from '~~/stores/session';

    interface PublishFormData {
        imageFile : File | undefined
        title : string,
        description : string,
        tags : string[]
    }

    const formData : PublishFormData = reactive({
        imageFile: undefined,
        title: '',
        description: '',
        tags: []
    })
    const loading = ref(false)

    const config = useRuntimeConfig()
    const router = useRouter()

    const { accessToken } = storeToRefs(useSessionStore())
    const imageStorageClient = new ImageStorageClient(config.public.imageStorageKey)
    const { errorText, errorTextVisible, showErrorText } = useErrorText()

    async function publish() {
        const { imageFile, title, description, tags } = formData
        
        if(!imageFile || title.length < 1 || !description || !tags) {
            showErrorText('All fields must be filled')
            return
        }
        
        if(!imageFile.type.startsWith('image/')) {
            showErrorText('Uploaded file must be an image')
            return
        }

        try {
            loading.value = true

            const uploadedImageUrl = await imageStorageClient.upload(imageFile)
            const addedPictureId = await addPicture(accessToken.value, { 
                imageUrl: uploadedImageUrl, 
                title, description, tags 
            })

            loading.value = false
            
            router.push('/pictures/' + addedPictureId)
        }
        catch(error) {
            loading.value = false

            if(error instanceof ImageStorageClientError) {
                showErrorText(error.message)
            }
            else {
                showErrorText('Failed to publish your picture. Try again later')
            }
        }
    }
</script>

<style>

</style>