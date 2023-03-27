<template>
    <div class="flex justify-center gap-x-10 mb-5">
        <div v-for="column in picturesColumns" :key="picturesColumns.indexOf(column)" 
            class="flex flex-col gap-y-8 basis-[20%] min-w-[265px]">
            <PictureCard v-for="picture in column" :key="picture.id" :picture="picture" class="w-full"/>
        </div>
    </div>

    <div ref="boardEnd" v-show="pictures.length > (currentPicturesPage * pictureOnPageCount) && pictures.length != 0">
        <Spinner size="large" class="mx-auto"/>
    </div>
</template>

<script lang="ts" setup>
    import { FeedPicture } from '~~/types'

    const props = defineProps<{
        pictures : FeedPicture[]
    }>()

    const currentPicturesPage = ref(1)
    const pictureOnPageCount = 8

    const boardEnd = ref<HTMLDivElement | undefined>(undefined)

    const picturesColumns = computed(() => {
        // Splitting pictures array into chunks (columns)
        const columns : FeedPicture[][] = []
        for(let i = 1; i <= getColumnCount(); i++) {
            columns.push([])
        }

        let currentColumn = columns[0]
        const picturesArray = props.pictures.slice(0, currentPicturesPage.value * pictureOnPageCount)


        if(picturesArray) {
            picturesArray.forEach(picture => {
                currentColumn.push(picture)

                const currentColumnIndex = columns.indexOf(currentColumn)
                if(currentColumnIndex == columns.length - 1) {
                    currentColumn = columns[0]
                }
                else {
                    currentColumn = columns[currentColumnIndex + 1]
                }
            })
        }

        return columns
    })

    const { windowWidth } = useWindowWidth()
    function getColumnCount() {
        const windowWidthValue = windowWidth.value

        if(process.client) {
            if(windowWidthValue < 1215 && windowWidthValue > 890) {
                return 3
            }
            else if(windowWidthValue < 890 && windowWidthValue > 580) {
                return 2
            }
            else if(windowWidthValue < 580) {
                return 1
            }
            else {
                return 4
            }
        }
        else {
            return 4
        }
    }

    onMounted(() => {
        const boardEndElement = boardEnd.value
        if(boardEndElement) {
            const boardEndObserver = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    if(props.pictures.length > (currentPicturesPage.value * pictureOnPageCount) 
                        && props.pictures.length != 0) {
                        console.log(currentPicturesPage.value++) 
                    }
                }
            })
            boardEndObserver.observe(boardEndElement)
        }
    })
</script>

<style>

</style>