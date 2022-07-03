import request from '@/utils/request.js'

/**
 * @param {} data
 * 获取对应城市的房源城市
 */
export const maphouse = (id) => {
  return request({
    method: 'GET',
    url: '/area/map',
    params: {
      id
    }
  })
}
