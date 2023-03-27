export const useSearchQueryStore = defineStore('searchQuery', () => {
    const searchQuery = ref('')

    return { searchQuery }
})