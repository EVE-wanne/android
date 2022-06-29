import request from '@/utils/request.js'

/**
 * @param {} data
 * 获取轮播图照片
 */
export const getpic = () => {
  return request({
    method: 'GET',
    url: '/home/swiper'

  })
}

/**
 * 租房小组的api
 *
 */
export const getgroups = (id) => {
  return request({
    method: 'GET',
    url: '/home/groups',
    params: {
      area: id
    }
  })
}
