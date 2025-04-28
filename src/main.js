import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as echarts from 'echarts'

const app = createApp(App)

// 全局挂载echarts
app.config.globalProperties.$echarts = echarts

app.use(router)
   .use(createPinia())
   .mount('#app') 