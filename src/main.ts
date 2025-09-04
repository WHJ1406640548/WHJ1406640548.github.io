import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; // 引入路由配置文件
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
const app = createApp(App)

// 全局注册组件
app.component('Header', Header)
app.component('Footer', Footer)
app.use(router).mount('#app')
