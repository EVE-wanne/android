import request from '@/utils/request.js'

/**
 * @param {username,password} data
 * 登录接口
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
