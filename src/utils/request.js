//* 将axios封装成方法使用，配置基础的url
import axios from 'axios'

//* 引入内部虚拟模块
import store from '@/store'

const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 5000
})

//* 请求拦截器
request.interceptors.request.use(
  (config) => {
    //* 将user的数据解构出来
    const { user } = store.state
    //* 如果user存在，并且user里存有token，再添加请求头
    if (user && user.token) {
      config.headers.Authorization = user.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
