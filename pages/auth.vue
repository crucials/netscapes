<template>
    <main class="main-content-wrapper" v-if="sessionChecked" @load="pageLoaded = true">
        <div class="py-16 px-8">
            <h1 class="font-bold text-black text-4xl mb-6">
                Welcome to Netscapes
            </h1>

            <p class="font-normal text-xl mb-12">
                A platform, where you can find inspiration and give it to the people.
            </p>

            <AuthForm/>
        </div>

        <img src="@/assets/images/valley-illustration.svg" alt="Valley with trees illustration" class="opacity-0 
            transition-opacity duration-700" :class="{ 'opacity-100': pageLoaded }">
    </main>
</template>

<script lang="ts" setup>
    import { useSessionInitListener } from '~~/composables/session-init-listener'

    useHead({
        title: 'Log into Netscapes'
    })

    const sessionChecked = ref(false)
    const pageLoaded = ref(false)

    const router = useRouter()
    useSessionInitListener((account) => {
        if (account.value) {
            router.push('/feed')
        }

        setTimeout(() => {
            sessionChecked.value = true

            // Another callback, because illustration smooth fade won't work without it 
            setTimeout(() => {
                    pageLoaded.value = true
                })
        }, 300)
    })
</script>

<style scoped>
    .main-content-wrapper {
        @apply flex-grow grid;
        grid-template-columns: 52.6% 47.4%;
    }

    @media (max-width: 1083px) {
        .main-content-wrapper {
            grid-template-columns: 1fr;
        }

        .main-content-wrapper > * {
            width: 100%;
        }
    }
</style>