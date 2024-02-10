<template>
    <ModalWindow :opened="opened" @window-closed="emit('window-closed')">
        <h3 class="text-center text-3xl mb-12">
            Create collection
        </h3>

        <form @submit.prevent="createCollection">
            <SimpleTextField v-model.trim="formData.name" class="block w-2/3 mx-auto mb-8
                m:w-full" 
                placeholder="Name"/>

            <div class="flex flex-col items-center gap-y-2 mb-9">
                <p class="text-center mb-1">
                    You can upload thumbnail for your collection:
                </p>
                <UploadFileButton class="mx-auto" @file-uploaded="file => formData.thumbnailFile = file"/>
                <span class="text-sm text-center text-fire"> {{ formData.thumbnailFile?.name }} </span>
            </div>

            <FilledButton class="block mx-auto mb-3 last:mb-0" type="submit" :loading="loading">
                Create
            </FilledButton>

            <ErrorText :error-text="errorText" :visible="errorTextVisible" class="text-center"/>
        </form>
    </ModalWindow>
</template>

<script lang="ts" setup>
    import { addCollection } from '~~/api'
    import { ImageStorageClient, ImageStorageClientError } from '~~/image-storage-client'
    import { useSessionStore } from '~~/stores/session'
    import { CollectionForm } from '~~/types'

    defineProps<{
        opened : boolean
    }>()
    const emit = defineEmits<{
        (event : 'collection-created') : void,
        (event : 'window-closed') : void
    }>()

    const { errorTextVisible, errorText, showErrorText } = useErrorText()

    const sessionStore = useSessionStore()
    const { accessToken } = storeToRefs(sessionStore)
    const { updateSession } = sessionStore

    interface CollectionFormData extends Omit<CollectionForm, 'thumbnailUrl'> {
        thumbnailFile? : File
    }

    const formData : CollectionFormData = reactive({
        name: '',
    })
    const loading = ref(false)

    const imageStorageClient = new ImageStorageClient()
    async function createCollection() {
        if(!loading.value) {
            loading.value = true

            const { name, thumbnailFile } = formData
            let thumbnailUrl : string | null = null

            if (thumbnailFile) {
                try {
                    thumbnailUrl = await imageStorageClient.upload(thumbnailFile)
                }
                catch (error) {
                    showErrorText('Failed to upload thumbnail. Check your image isn\'t broken or try again later')
                    loading.value = false
                    return
                }
            }

            if (name.length < 1) {
                showErrorText('Collection name must not be empty')
                loading.value = false
                return
            }
            if(name.length >= 45) {
                showErrorText('Collection name must be shorter than 45 characters')
                loading.value = false
                return
            }
            if(name == 'Saved') {
                showErrorText('This name is reserved. Try something different')
                loading.value = false
                return
            }

            try {
                await addCollection(accessToken.value, { name, thumbnailUrl })
                updateSession()
                emit('collection-created')
                emit('window-closed')
            }
            catch (error) {
                showErrorText('Something went wrong while trying to create a collection. Try again later')
            }
            
            formData.name = ''
            formData.thumbnailFile = undefined

            loading.value = false
        }
    }
</script>

<style>

</style>