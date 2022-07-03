import request from '@/utils/request.js'

/**
 * @param {} data
 * 获取房屋的筛选条件
 */
export const gethouseinfo = (id) => {
  return request({
    method: 'GET',
    url: `/houses/${id}`
  })
}

/**
 * @param {} data
 * 收藏房屋
 */
export const addrooms = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`
  })
}
