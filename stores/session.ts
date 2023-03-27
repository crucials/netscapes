import { getCurrentAccount, isTokenValid } from '~~/api'
import { ExtendedAccountInfo } from '~~/types'

export const useSessionStore = defineStore('session', () => {
    const sessionInitialized = ref(false)
    const accessToken = ref('')
    const account = ref<ExtendedAccountInfo | undefined>(undefined)

    onMounted(async () => {
        const accessTokenFromLocalStorage = localStorage.getItem('access_token')
        if(accessTokenFromLocalStorage) {
            if(await isTokenValid(accessTokenFromLocalStorage)) {
                await updateSession(accessTokenFromLocalStorage)
            }
        }

        watch(accessToken, (newAccessToken : string) => {
            localStorage.setItem('access_token', newAccessToken)
            updateSession(newAccessToken)
        })

        sessionInitialized.value = true
    })

    async function updateSession(newAccessToken? : string) {
        if(newAccessToken) {
            accessToken.value = newAccessToken
        }

        try {
            account.value = await getCurrentAccount(accessToken.value)
        }
        catch(error) {
            console.log(error)
        }
    }

    return { accessToken, account, sessionInitialized, updateSession }
})