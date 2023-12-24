import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export * from './modules/img' // 从某文件中导出所有 非默认导出 的代码
export default pinia