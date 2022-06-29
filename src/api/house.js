import request from '@/utils/request.js'

/**
 * @param {} data
 * 获取房屋的筛选条件
 */
export const getcondition = (id) => {
  return request({
    method: 'GET',
    url: '/houses/condition',
    params: {
      id
    }
  })
}

/**
 * @param {} data
 * 根据地区获得房屋数据
 */
export const gethouses = (params) => {
  return request({
    method: 'GET',
    url: '/houses',
    params
  })
}
