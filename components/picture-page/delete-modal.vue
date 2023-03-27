<template>
    <ModalWindow :opened="deleteModalOpened" @window-closed="emit('window-closed')">
        <h3 class="text-center text-xl mb-5">
            Are you sure you want to delete this picture?
        </h3>

        <FilledButton class="mx-auto block mb-5" @click="deletePicture">
            Yes, delete
        </FilledButton>

        <ErrorText :error-text="errorText" :visible="errorTextVisible"/>
    </ModalWindow>
</template>

<script lang="ts" setup>
    import { deletePictureById } from '~~/api'
    import { useSessionStore } from '~~/stores/session'

    const props = defineProps<{
        deleteModalOpened : boolean,
        pictureId : number
    }>()
    const emit = defineEmits<{
        (event : 'picture-deleted') : void,
        (event : 'window-closed') : void
    }>()

    const { errorText, errorTextVisible, showErrorText } = useErrorText()
    const { accessToken } = storeToRefs(useSessionStore())

    async function deletePicture() {
        try {
            await deletePictureById(accessToken.value, props.pictureId)
            emit('picture-deleted')
        }
        catch(error) {
            showErrorText('Failed to delete your picture. Try again later')
        }
    }
</script>

<style>

</style>