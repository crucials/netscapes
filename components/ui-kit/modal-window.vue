<template>
    <Teleport to="body">
        <div class="fixed w-full h-screen bg-black/50 z-30 top-0 left-0" :hidden="!opened" @click="emit('window-closed')">

        </div>

        <dialog class="fixed block rounded-2xl bg-white pt-16 mx-auto -top-[200%] transition-all duration-500 ease-in-out
            open:top-1/2 open:-translate-y-1/2 w-1/3 z-40 backdrop:bg-black/50 min-w-3" 
            :open="opened">
            <button class="absolute top-5 right-5" @click="emit('window-closed')">
                <img src="@/assets/images/cross.svg" alt="Cross">
            </button>
            <slot></slot>
        </dialog>        
    </Teleport>
</template>

<script lang="ts" setup>
    defineProps<{
        opened : boolean
    }>()

    const emit = defineEmits<{
        (event : 'window-closed') : void
    }>()
</script>

<style>

</style>