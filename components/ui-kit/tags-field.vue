<template>
    <div class="px-5 py-2 bg-neutral-100 rounded-xl focus:outline-none transition-border border border-neutral-300
        flex justify-start gap-4 flex-wrap" :class="{ 'field-focused': focused }">
        <TransitionGroup name="tags-list">

            <div class="px-5 py-1 bg-fire text-white rounded-lg" v-for="tag in tags" :key="tags.indexOf(tag)">
                <span class="mr-2">
                    {{ tag }}
                </span>

                <button type="button" class="transition-transform active:scale-125">
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click="deleteTag(tag)">
                        <line y1="-1" x2="14" y2="-1" transform="matrix(0.706002 0.70821 -0.706002 0.70821 1 2)" stroke="white" stroke-width="2"/>
                        <line y1="-1" x2="14" y2="-1" transform="matrix(0.706002 -0.70821 0.706002 0.70821 2 11.6372)" stroke="white" stroke-width="2"/>
                    </svg>
                </button>
            </div>

        </TransitionGroup>

        <input type="text" class="bg-transparent py-1 focus:outline-none placeholder:text-400" @focus="focused = true"
            @blur="focused = false" placeholder="Tags..." v-model.trim="newTag" @keypress="addTagIfEnterPressed">
    </div>
</template>

<script lang="ts" setup>
    import { PropType } from 'vue'

    const props = defineProps({
        initialTags: {
            type: Array as PropType<string[]>,
            default: []
        }
    })
    const emit = defineEmits<{
        (event : 'tags-updated', newValue : string[]) : void
    }>()

    const tags = ref(props.initialTags)
    const newTag = ref('')
    const focused = ref(false)

    function deleteTag(tagToDelete : string) {
        tags.value = tags.value.filter(tag => tag != tagToDelete)
        emit('tags-updated', tags.value)
    }

    function addTagIfEnterPressed(event : KeyboardEvent) {
        if(event.key == 'Enter') {
            const newTagValue = newTag.value
            if(newTagValue.length > 0) {
                if(!tags.value.includes(newTagValue)) {
                    tags.value.push(newTagValue)
                    emit('tags-updated', tags.value)
                    newTag.value = ''
                }
            }
        }
    }
</script>

<style scoped>
    .field-focused {
        @apply border-fire;
    }

    .tags-list-leave-active {
        @apply transition-all duration-300;
    }

    .tags-list-leave-to {
        @apply opacity-0 -translate-x-4;
    }
</style>