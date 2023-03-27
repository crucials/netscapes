export function usePageLoadListener(doOnPageLoad? : () => void) {
    const pageLoaded = ref(false)
    
    onMounted(() => {     
        setTimeout(() => {
            pageLoaded.value = true
            if(doOnPageLoad) {
                doOnPageLoad()
            }
        })
    })

    return { pageLoaded }
}