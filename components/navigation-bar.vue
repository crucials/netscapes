<template>
    <ModalWindow :opened="changeAvatarWindowOpened" @window-closed="changeAvatarWindowOpened = false">
        <h3 class="text-center text-xl mb-4">
            Select image you want to be a new avatar
        </h3>

        <UploadFileButton class="mx-auto mb-3" @file-uploaded="changeAvatar"/>
        <ErrorText :visible="errorTextVisible" :error-text="errorText" class="text-center"/>
    </ModalWindow>

    <nav class="flex justify-between gap-x-4 gap-y-6 px-10 py-2.5 items-center 
        m:fixed m:w-full m:h-screen m:top-0 m:-right-full m:bg-white m:z-10 m:flex-col 
        m:py-5 m:transition-right m:duration-500 m:justify-center m:gap-y-8" :class="{ 'm:right-0': openedOnMobile }">
        <NuxtLink to="/feed">
            <img src="@/assets/images/logo.svg" alt="Netscapes logo" class="w-16">
        </NuxtLink>

        <UnderlinedTextField placeholder="Search by name, tags or description" 
            v-model="searchInputText" class="w-1/3" @keypress="searchIfEnterKeyPressed"/>

        <ul class="flex justify-center gap-x-7 gap-y-4 items-center flex-wrap">
            <li>
                <NuxtLink to="/feed" class="text-lg transition-colors duration-200 
                    hover:text-neutral-700">
                    Feed
                </NuxtLink>
            </li>

            <li>
                <NuxtLink :to="accessToken ? `/accounts/${account?.id}` : '/auth'" 
                    class="text-lg transition-colors duration-200 
                    hover:text-neutral-600">
                    My account
                </NuxtLink>
            </li>

            <li>
                <NuxtLink to="/publish">
                    <FilledButton>
                        Publish
                    </FilledButton>
                </NuxtLink>
            </li>
        </ul>

        <div>
            <div class="flex items-center justify-center gap-x-2" v-if="account">
                <NuxtLink :to="'/accounts/' + account.id">
                    <AccountAvatar :account="account"/>
                </NuxtLink>

                <DropDownList :items="dropDownItems"
                    @item-clicked="handleDropDownItemClick">
                    {{ account.username }}
                    <img src="@/assets/images/down-arrow.svg" alt="Down arrow">
                </DropDownList>
            </div>

            <NuxtLink to="/auth" class="text-lg transition-colors duration-200 
                hover:text-neutral-600" v-else>
                Log in
            </NuxtLink>
        </div>
    </nav>
</template>

<script lang="ts" setup> 
    import { setAvatar } from '~~/api'
    import { ImageStorageClient, ImageStorageClientError } from '~~/image-storage-client'
    import { useSearchQueryStore } from '~~/stores/search-query'
    import { useSessionStore } from '~~/stores/session'
    import { DropDownItem } from '~~/types'

    defineProps<{
        openedOnMobile : boolean
    }>()
    const emit = defineEmits<{
        (event : 'closed') : void
    }>()

    const route = useRoute()
    watch(route, () => {
        emit('closed')
    })

    const searchInputText = ref('')
    const { searchQuery } = storeToRefs(useSearchQueryStore())

    const config = useRuntimeConfig()
    const router = useRouter()

    const imageStorageClient = new ImageStorageClient(config.public.imageStorageKey)

    const { account, accessToken } = storeToRefs(useSessionStore())

    const changeAvatarWindowOpened = ref(false)
    const { errorText, errorTextVisible, showErrorText } = useErrorText()

    const dropDownItems : DropDownItem[] = [
        { 
            title: 'Logout', 
            value: 'logout', 
            iconFilename: 'logout.svg', iconAltText: 'Opened door icon' 
        },

        { 
            title: 'Change avatar', 
            value: 'change-avatar', 
            iconFilename: 'avatar.svg', iconAltText: 'Landscapes icon' 
        }
    ]
    function handleDropDownItemClick(item : DropDownItem) {
        if(item.value == 'logout') {
            accessToken.value = ''
            window.location.reload()
        }
        else if(item.value == 'change-avatar') {
            changeAvatarWindowOpened.value = true
        }
    }

    async function changeAvatar(file : File) {
        if(file.type.split('/')[0] != 'image') {
            showErrorText('File must be an image')
            return
        }

        try {
            const uploadedImageUrl = await imageStorageClient.upload(file)
            await setAvatar(accessToken.value, uploadedImageUrl)

            if(account.value) {
                account.value.avatarUrl = uploadedImageUrl
            }

            changeAvatarWindowOpened.value = false
        }
        catch(error) {
            if(error instanceof ImageStorageClientError) {
                showErrorText(error.message)
            }
            else {
                showErrorText('Failed to change your avatar. Try again later')
            }
        }
    }

    function searchIfEnterKeyPressed(event : KeyboardEvent) {
        if(event.key == 'Enter') {
            searchQuery.value = searchInputText.value
            searchInputText.value = ''
            router.push('/search')
        }
    }
</script>

<style>

</style>