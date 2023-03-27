export function useWindowWidth() {
    const windowWidth = ref(0)

    onMounted(() => {
        windowWidth.value = window.innerWidth
        window.addEventListener('resize', () => {
            windowWidth.value = window.innerWidth
        })
    })

    return { windowWidth }
}