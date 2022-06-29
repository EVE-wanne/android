import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//* 导入vant
import Vant, { Lazyload } from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
//* 导入移动适配插件
import 'amfe-flexible'
import '@/styles/reset.less'

Vue.use(Vant)
Vue.config.productionTip = false

Vue.use(Lazyload)

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
