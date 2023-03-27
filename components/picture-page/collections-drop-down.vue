<template>
    <DropDownList :items="dropDownItems" v-if="visible && dropDownItems.length > 0" 
        @item-clicked="saveToCollection">
        Save to
        <img src="@/assets/images/down-arrow.svg" alt="Down arrow">
    </DropDownList>
</template>

<script lang="ts" setup>
    import { addPictureToCollection } from '~~/api'
    import { Collection, DropDownItem } from '~~/types'

    const props = defineProps<{
        pictureId : number
    }>()

    const visible = ref(false)
    const accessToken = ref('')
    const dropDownItems = ref<DropDownItem[]>([])

    useSessionInitListener((account, token) => {
        if(token.value != '' && account.value) {
            dropDownItems.value = account.value.collections.map(collection => {
                return {
                    title: collection.name,
                    value: String(collection.id),
                    iconFilename: 'collection.svg',
                    iconAltText: 'Stacked pictures icon'
                }
            })

            accessToken.value = token.value
            visible.value = true
        }
    })

    async function saveToCollection(collectionItem : DropDownItem) {
        if(collectionItem.title != 'Saved') {
            try {
                await addPictureToCollection(accessToken.value, props.pictureId, +collectionItem.value)
                collectionItem.title = 'Saved'
            }
            catch(error) {} // Should notify user about error, will be implemented in future
        }
    }
</script>

<style>

</style>