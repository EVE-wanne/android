import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home', //* 重定向，页面打开就调到首页
    children: [
      { path: 'home', component: () => import('@/views/Home') },
      { path: 'room', component: () => import('@/views/Room') },
      { path: 'consult', component: () => import('@/views/Consult') },
      { path: 'my', component: () => import('@/views/My') }
    ]
  },
  { path: '/login', component: () => import('@/views/Login') },
  { path: '/register', component: () => import('@/views/Register') }
]

const router = new VueRouter({
  routes
})

export default router
