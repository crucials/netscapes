<template>
    <main class="main-content-wrapper" v-if="sessionChecked">
        <div class="py-16 px-8">
            <h1 class="font-bold text-black text-4xl mb-6">
                Welcome to Netscapes
            </h1>

            <p class="font-normal text-xl mb-12">
                A platform, where you can find inspiration and give it to the people.
            </p>

            <AuthForm/>
        </div>

        <Transition appear enter-from-class="opacity-0">
            <img src="@/assets/images/valley-illustration.svg" alt="Valley with trees illustration" class="transition-opacity duration-700">
        </Transition>
    </main>
</template>

<script lang="ts" setup>
    import { useSessionInitListener } from '~~/composables/session-init-listener'

    useHead({
        title: 'Log into Netscapes'
    })

    const sessionChecked = ref(false)

    const router = useRouter()
    useSessionInitListener((account) => {
        if (account.value) {
            router.push('/feed')
        }

        sessionChecked.value = true
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