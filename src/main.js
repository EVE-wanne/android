import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//* 导入vant
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
//* 导入移动适配插件
import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
