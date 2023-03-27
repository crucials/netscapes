<template>
    <main class="p-16 xs:p-4" v-if="account">
        <img :src="account?.avatarUrl" :alt="`${account.username}'s username`" class="w-48 h-48 rounded-full mb-5" 
            v-if="!imageBroken">
        <img src="@/assets/images/no-avatar.svg" alt="No avatar" class="w-48 h-48 rounded-full mb-5" v-else>

        <span class="block text-3xl mb-20">
            @{{ account.username }}
        </span>

        <div class="flex justify-between gap-x-2 items-start gap-y-14 lg:flex-col">
            <CollectionsSection :account="account" v-if="account.collections.length != 0 || currentAccount" 
                @collection-created="refresh"/>
                
            <PicturesSection :account="account" v-if="account.publishedPictures.length != 0 || currentAccount"/>
        </div>
    </main>
</template>

<script lang="ts" setup>
    import { API_BASE_URL } from '~~/api'
    import { useSessionStore } from '~~/stores/session'
    import { ExtendedAccountInfo } from '~~/types'

    const accountId = useRoute().params.id
    const { data: account, refresh } = await useFetch<ExtendedAccountInfo>(`${API_BASE_URL}/accounts/${accountId}`)
    const { account: sessionAccount } = storeToRefs(useSessionStore())

    const currentAccount = computed(() => sessionAccount.value?.id == account.value?.id)

    if(!account.value) {
        throw createError({ statusCode: 404, message: 'Account not found' })
    }

    useHead({
        title: `@${account.value.username} - Netscapes`
    })

    const { imageBroken } = useFallbackImage(account.value.avatarUrl)
</script>

<style>

</style>