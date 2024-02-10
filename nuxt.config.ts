// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    'defineStore', 'storeToRefs'
                ]
            }
        ]
    ],

    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],

    app: {
        pageTransition: {
            name: 'picture-page'
        }
    }
})
