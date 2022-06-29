import Vue from 'vue'
import VueRouter from 'vue-router'
//* 引入内部虚拟模块
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home', //* 重定向，页面打开就调到首页
    children: [
      { path: 'home', component: () => import('@/views/Home') },
      { path: 'room', component: () => import('@/views/Room'), name: 'room' },
      { path: 'consult', component: () => import('@/views/Consult') },
      {
        path: 'my',
        component: () => import('@/views/My')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/Login') },
  { path: '/register', component: () => import('@/views/Register') },
  { path: '/mycollect', component: () => import('@/views/My/components/mycollect.vue') },
  { path: '/myrent', component: () => import('@/views/My/components/myrent.vue') },
  { path: '/myrecord', component: () => import('@/views/My/components/myrecord.vue') },
  { path: '/homeowner', component: () => import('@/views/My/components/homeowner.vue') },
  { path: '/mydata', component: () => import('@/views/My/components/mydata.vue') },
  { path: '/contactus', component: () => import('@/views/My/components/contactus.vue') },
  { path: '/city', component: () => import('@/views/City') },
  { path: '/map', component: () => import('@/views/Map'), name: 'map' },
  { path: '/publish', component: () => import('@/views/Publish'), name: 'publish' }

]

const router = new VueRouter({
  routes
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
  const { user } = store.state
  if ((to.path === '/mycollect' || to.path === '/myrent' || to.path === '/myrecord' || to.path === '/homeowner' || to.path === '/mydata') && user === null) {
    //* 跳转到登录页面
    next('/login') // 阻止路由跳转
  } else {
    next() // 正常放行
  }
})
//* 解决前置路由守卫重定向报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch((err) => err)
}
export default router
