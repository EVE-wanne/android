//* 将axios封装成方法使用，配置基础的url
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 5000
})

export default request
