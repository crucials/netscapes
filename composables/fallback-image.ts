export function useFallbackImage(imageUrl : string, doOnCheckEnd? : () => void) {
    const imageBroken = ref(false)

    onMounted(async () => {
        try {
            const response = await fetch(imageUrl)
            if(!response.ok) {
                imageBroken.value = true
            }
        }
        catch(error) {
            imageBroken.value = true
            console.log(error)
        }
        finally {
            if(doOnCheckEnd) {
                doOnCheckEnd()
            }
        }
    })

    return { imageBroken }
}