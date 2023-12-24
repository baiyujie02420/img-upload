<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const fileList = ref([])
const base64Url = ref([])
const imgUrl = ref()
import { useImgsStore } from '@/store/index'
const store = useImgsStore()

// 将 ArrayBuffer 转换为 Base64 编码
const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
}

// 发送图片给后端
const sendFileToServer = (file) => {
    return axios.post('http://127.0.0.1:3000/api/upload', file, {
        headers: {
            'Content-Type': 'multipart/form-data' // 设置请求的 Content-Type 头部字段，指定了发送的数据类型为 multipart/form-data。
            // 对于文件上传，一般使用 multipart/form-data 数据格式。
        }
    })
}

// 向后端索要图片
const getImg = (oldurl) => {
    console.log(oldurl)
    let newurl = oldurl.replace('uploads/', '') // 处理后端发来的url图片地址
    // store.changeImgUrl('http://127.0.0.1:3000/' + newurl) // 把图片地址存到store里面
    return axios({
        method: 'get',
        url: `http://127.0.0.1:3000/${newurl}`,
        responseType: 'arraybuffer' // 设置响应数据是arraybuffer类型
        // ArrayBuffer 是一种用于表示二进制数据的 JavaScript 对象。它可以存储和操作原始的二进制数据，例如图片、音频、视频等。
    })
}
// 上传图片之后的回调
const afterRead = async (e) => {
    console.log(e.file, e.objectUrl)
    imgUrl.value = e.objectUrl
    const fd = new FormData()
    fd.append('file', e.file)
    const res = await sendFileToServer(fd)

    const { data } = await getImg(res.data.url)
    console.log(data)
    const imageData = `data:image/jpeg;base64,${arrayBufferToBase64(data)}`
    store.changeImgUrl(imageData)
    
}

onMounted(() => {
    const re = store.imgUrl.map((item,index) => {
        return {
            url: item,
            isImage: true
        }
      })
      console.log(re)
      fileList.value = re
})
</script>

<template>
    <div>
        <van-uploader :after-read="afterRead" v-model="fileList" multiple/>
    </div>
</template>

<style></style>
