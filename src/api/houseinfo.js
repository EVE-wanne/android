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
 * 判断是否收藏
 */
export const decide = (id) => {
  return request({
    method: 'GET',
    url: `/user/favorites/${id}`
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

/**
 * @param {} data
 * 删除房屋
 */
export const delrooms = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/favorites/${id}`
  })
}
