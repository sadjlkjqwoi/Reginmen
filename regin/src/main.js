import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

// const instance = axios.create({
//     baseURL: 'http://localhost:7777' // 设置默认请求的url
//   })
const app = createApp(App)

// 将 axios 添加到应用程序全局范围内
app.config.globalProperties.$axios = axios
axios.defaults.baseURL = 'http://localhost:7777/'

app.use(store).use(router).use(ViewUIPlus).mount('#app')
// .use(ElementPlus)
// app.config.globalProperties.$http = instance