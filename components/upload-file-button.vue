<template>
    <label class="upload-button">
        <!-- Hide real button to customize file input -->
        <input type="file" class="hidden" ref="fileInput" @change="updateUploadedFile">
        <img src="@/assets/images/upload.svg" alt="Up arrow">
        Upload
    </label>
</template>

<script lang="ts" setup>
    const fileInput = ref<HTMLInputElement | undefined>()

    const emit = defineEmits<{
        (event : 'file-uploaded', uploadedFile : File) : void
    }>()

    function updateUploadedFile() {
        const fileInputFiles = fileInput.value?.files
        if(fileInputFiles) {
            emit('file-uploaded', fileInputFiles[0])
        }
    }
</script>

<style scoped>
    .upload-button {
        @apply bg-fire-gradient px-5 py-2.5 flex items-center gap-x-2.5 w-fit text-white rounded-xl 
            hover:cursor-pointer transition-all duration-300 text-lg;
        background-size: 200% 200%;
        background-position: left top;
    }

    .upload-button:hover {
        background-position: 45% 30%;
    }
</style>