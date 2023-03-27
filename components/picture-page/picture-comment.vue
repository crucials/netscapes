<template>
    <article>
        <header class="flex gap-x-2.5 items-center mb-2.5">
            <NuxtLink :to="`/accounts/${comment.authorAccount.id}`" class="flex items-center gap-x-2.5">
                <AccountAvatar :account="comment.authorAccount"/>
                <span class="text-sm">
                    {{ comment.authorAccount.username }}
                </span>
            </NuxtLink>
            
            <span class="text-sm text-neutral-400">
                ·
            </span>

            <time class="text-sm text-neutral-400" :datetime="comment.creationDate">
                {{ new Date(comment.creationDate).toLocaleDateString('en', { dateStyle: 'short' })
                    .replaceAll('/', '.') }}
            </time>
        </header>

        <p>
            {{ comment.text }}
        </p>
    </article>
</template>

<script lang="ts" setup>
    import { Comment } from '~~/types'

    defineProps<{
        comment : Comment
    }>()
</script>

<style>

</style>