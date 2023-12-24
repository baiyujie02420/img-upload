<script setup>
import { ref } from 'vue'
import axios from 'axios'

const inputFileRef =ref(null)
const selectfile = ref() // 已上传的文件
const imageUrl = ref('') // 图片 URL

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

const uploadFile =() => {
    inputFileRef.value.click()
}
// 处理文件上传这个动作
const handleChange = (e) => {
    selectfile.value = e.target.files[0]
    const formData = new FormData()
    formData.append('file', e.target.files[0])

    axios
        .post('http://127.0.0.1:3000/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求的 Content-Type 头部字段，指定了发送的数据类型为 multipart/form-data。
                // 对于文件上传，一般使用 multipart/form-data 数据格式。
            }
        })
        .then((res) => {
            // console.log(res.data)
            let processedStr = res.data.url.replace('uploads/', '') // 处理后端发来的url图片地址
            axios({
                method: 'get',
                url: `http://127.0.0.1:3000/${processedStr}`,
                responseType: 'arraybuffer' // 设置响应数据是arraybuffer类型
                // ArrayBuffer 是一种用于表示二进制数据的 JavaScript 对象。它可以存储和操作原始的二进制数据，例如图片、音频、视频等。
            })
                .then((response) => {
                    const imageData = arrayBufferToBase64(response.data) // 将获取到的 ArrayBuffer 数据转换为 Base64 编码
                    imageUrl.value = `data:image/jpeg;base64,${imageData}` // 通过将 Base64 编码与 'data:image/jpeg;base64,' 字符串拼接，创建一个表示图片的 Data URL
                    console.log(imageUrl.value)
                })
                .catch((error) => {
                    console.error('Error fetching image:', error)
                })
        })
        .catch((error) => {
            console.error(error)
        })
}
</script>

<template>
    <input type="file" id="files" @change="handleChange" ref="inputFileRef"/>
    <div id="imgs" @click="uploadFile">
        <img :src="imageUrl" alt="Uploaded Image" id="picture" v-show="imageUrl"/>
    </div>
</template>

<style scoped>
#files {
    display: none;
}
#picture{
    width: 200px;
    height: 200px;
}
#imgs{
    width: 200px;
    height: 200px;
    background-color: pink;
}
</style>
