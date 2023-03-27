import { useSessionStore } from '~~/stores/session'
import { ExtendedAccountInfo } from '~~/types'

type SessionInitCallback = (sessionAccount : Ref<ExtendedAccountInfo | undefined>, accessToken : Ref<string>) => void

/* Runs 'doOnSessionInit' when session store will be initialized  */
export function useSessionInitListener(doOnSessionInit : SessionInitCallback) {
    const { sessionInitialized, account, accessToken } = storeToRefs(useSessionStore())
    if(sessionInitialized.value) {
        doOnSessionInit(account, accessToken)
    }
    else {
        const unwatch = watch(sessionInitialized, (newValue) => {
            if(newValue) {
                doOnSessionInit(account, accessToken)
                unwatch()
            }
        })
    }

    return { sessionInitialized }
}