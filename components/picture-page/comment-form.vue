<template>
    <form class="w-3/4 sm:w-full" @submit.prevent="postComment">
        <SimpleTextField multiline rows="3" class="w-full mb-3" placeholder="What’s your opinion about this image?"
            v-model.trim="commentText"/>

        <FilledButton class="mb-3">
            Post
        </FilledButton>

        <ErrorText :error-text="errorText" :visible="errorTextVisible"/>
    </form>
</template>

<script lang="ts" setup>
    import { addComment } from '~~/api'
    import { useSessionStore } from '~~/stores/session'

    const props = defineProps<{
        targetPictureId : number
    }>()
    const emit = defineEmits<{
        (event : 'comment-posted') : void
    }>()

    const commentText = ref('')
    const { errorTextVisible, errorText, showErrorText } = useErrorText()
    const { accessToken } = storeToRefs(useSessionStore())
    const router = useRouter()

    async function postComment() {
        if(accessToken.value == '') {
            router.push('/auth')
        }
        else {
            // Removing line breaks
            const commentLines = commentText.value.split('\n')
            const processedText = commentLines.reduce((line1, line2) => line1 + ' ' + line2)

            if(processedText.length < 1) {
                showErrorText('Your comment text can\'t be empty')
                return
            }
            if(processedText.length > 200) {
                showErrorText('Your comment text can\'t be longer than 200 characters')
                return
            }

            try {
                await addComment(accessToken.value, processedText, props.targetPictureId)
                emit('comment-posted')
                commentText.value = ''
            }
            catch(error) {
                showErrorText('Failed to post your comment, try again later')
            }
        }
    }
</script>

<style>

</style>