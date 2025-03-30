import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import App from './App.vue'

// 创建应用实例
const app = createApp(App)

// 对pinia使用插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 使用 Pinia 状态管理
app.use(pinia)

// 创建路由实例
app.use(router)

// 挂载到 DOM
app.mount('#app')