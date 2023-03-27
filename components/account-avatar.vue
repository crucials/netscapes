<template>
    <img :src="account.avatarUrl" alt="Account profile picture" v-if="account.avatarUrl && !imageBroken" 
        class="w-[38px] h-[38px] rounded-full">
    <img src="@/assets/images/no-avatar.svg" alt="User icon default avatar" v-else
        class="w-[38px] h-[38px]">
</template>

<script lang="ts" setup>
    import { Account } from '~~/types'

    const props = defineProps<{
        account : Account
    }>()

    const { imageBroken } = useFallbackImage(props.account.avatarUrl)
</script>

<style>

</style>