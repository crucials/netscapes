export function useErrorText() {
    const errorTextVisible = ref(false)
    const errorText = ref('')

    let hideTimeoutId = 0
    function showErrorText(text : string) {
        window.clearTimeout(hideTimeoutId)

        errorText.value = text
        errorTextVisible.value = true
        hideTimeoutId = window.setTimeout(() => {
            errorTextVisible.value = false
        }, 2750)
    }

    return { errorTextVisible, errorText, showErrorText }
}