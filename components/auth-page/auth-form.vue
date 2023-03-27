<template>
    <form>
        <UnderlinedTextField v-model.trim="formData.username" class="w-7/12 mb-7" placeholder="Username"/>
        <UnderlinedTextField v-model.trim="formData.password" class="w-7/12 mb-7" placeholder="Password"
            :type="formData.hidePassword ? 'password' : 'text'"/>

        <Checkbox v-model="formData.hidePassword" class="mb-7">
            Hide password
        </Checkbox>

        <div class="flex gap-5 xs:flex-wrap">
            <FilledButton type="button" @click="logIn" :loading="logInButtonLoading">
                Log in
            </FilledButton>

            <OutlinedButton type="button" @click="signUp" :loading="signUpButtonLoading">
                Sign up
            </OutlinedButton>
        </div>

        <ErrorText :visible="errorTextVisible" :error-text="errorText"/>
    </form>
</template>

<script lang="ts" setup>
    import { useSessionStore } from '~~/stores/session'
    import { logInForJwt, signUpForJwt } from '~~/api'
    import { ApiError } from '~~/types'

    const router = useRouter()

    const formData = reactive({ username: '', password: '', hidePassword: true })
    const logInButtonLoading = ref(false)
    const signUpButtonLoading = ref(false)

    const { errorText, errorTextVisible, showErrorText } = useErrorText()

    const { accessToken } = storeToRefs(useSessionStore())

    async function logIn() {
        const { username, password } = formData

        if(checkCredentials(username, password)) {
            logInButtonLoading.value = true

            try {
                accessToken.value = await logInForJwt(username, password)
                router.push('/feed')
            }
            catch(error) {
                if(error instanceof ApiError) {
                    if(error.statusCode == 401) {
                        showErrorText('Invalid username or password. Check fields for typos and try again')
                    }
                    else {
                        showErrorText('Something went wrong while trying to log you in. Try again later')
                        console.error(error.statusCode + ': ' + error.message)
                    }
                }
                else {
                    showErrorText('Something went wrong while trying to log you in. Try again later')
                    console.error(error)
                }
            }

            logInButtonLoading.value = false
        }
        else {
            showErrorText('Your username and password must be longer than 2 and shorter than 15 characters')
        }
    }

    async function signUp() {
        const { username, password } = formData

        if(checkCredentials(username, password)) {
            signUpButtonLoading.value = true

            try {
                accessToken.value = await signUpForJwt(username, password)
                router.push('/feed')
            }
            catch(error) {
                if(error instanceof ApiError) {
                    if(error.statusCode == 409) {
                        showErrorText('Account with that username already exists')
                    }
                    else {
                        showErrorText('Something went wrong while trying to log you in. Try again later')
                        console.error(error.statusCode + ': ' + error.message)
                    }
                }
                else {
                    showErrorText('Something went wrong while trying to log you in. Try again later')
                    console.error(error)
                }
            }

            signUpButtonLoading.value = false
        }
        else {
            showErrorText('Your username and password must be longer than 2 and shorter than 15 characters')
        }
    }

    function checkCredentials(username : string, password : string) {
        if(username.length > 2 && username.length < 15
            && password.length > 2 && password.length < 15) {
            return true
        }
        else {
            return false
        }
    }
</script>

<style scoped>
    
</style>