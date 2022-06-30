import request from '@/utils/request.js'

/**
 * @param {} data
 * 获取用户数据
 */
export const getuserinfo = () => {
  return request({
    method: 'GET',
    url: '/user'
  })
}

/**
 * @param {} data
 * 获取用户的出租数据
 */
export const getmyhouse = () => {
  return request({
    method: 'GET',
    url: '/user/houses'
  })
}
