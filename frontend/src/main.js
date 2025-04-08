import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import CommonComponents from './components/common'

// 导入路由页面组件
import Dashboard from './views/Dashboard.vue'
import Ledger from './views/Ledger.vue'
import Analysis from './views/Analysis.vue'
import Categories from './views/Categories.vue'
import UserAccount from './views/UserAccount.vue'

// 定义路由
const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/ledger', component: Ledger },
  { path: '/analysis', component: Analysis },
  { path: '/categories', component: Categories },
  { path: '/account', component: UserAccount }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 创建pinia实例
const pinia = createPinia()

// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.use(CommonComponents)

app.mount('#app')
