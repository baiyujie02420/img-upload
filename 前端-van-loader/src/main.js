import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store/index'
import 'vant/lib/index.css'
import { Uploader } from 'vant'

const app = createApp(App)
app.use(pinia)
app.use(Uploader)
app.mount('#app')