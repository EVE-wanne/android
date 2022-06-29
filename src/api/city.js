import request from '@/utils/request.js'

/**
 * @param {} data
 * 获取城市信息
 */
export const getcity = (num) => {
  return request({
    method: 'GET',
    url: '/area/city',
    params: {
      level: num
    }
  })
}

/**
 * @param {} data
 * 获取热门城市
 */
export const gethotcity = () => {
  return request({
    method: 'GET',
    url: '/area/hot'

  })
}
