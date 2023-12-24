import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useImgsStore = defineStore(
    'imgs',
    () => {
        const imgUrl = ref([])

        const changeImgUrl =(url) => {
            imgUrl.value.push(url)
        }

        const cleanImgUrl = () => {
            imgUrl.value = []
        }
        return { imgUrl ,changeImgUrl,cleanImgUrl}
    },
    {
        // pinia本地持久化
        persist: true
    }
)
