import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 创建应用实例
const app = createApp(App)

// 使用 Pinia 状态管理
app.use(createPinia())

// 创建路由实例
app.use(router)

// 挂载到 DOM
app.mount('#app')