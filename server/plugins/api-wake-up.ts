import { API_BASE_URL } from '~~/api'

export default defineNitroPlugin((nitroApp) => {
    setInterval(async () => {
        await $fetch(API_BASE_URL + '/pictures')
    }, 10000 * 60)
})