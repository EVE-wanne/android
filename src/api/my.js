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
