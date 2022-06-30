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

/**
 * @param {} data
 * 上传图片
 */
export const upimg = (file) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    headers: { 'content-type': 'multipart/form-data' },
    data: {
      file
    }
  })
}

/**
 * @param {} data
 * 获取发布房屋所需的条件
 */
export const housecondition = () => {
  return request({
    method: 'GET',
    url: '/houses/params'

  })
}

/**
 * @param {} data
 * 获取小区名字
 */
export const gethousename = ({ name, id }) => {
  return request({
    method: 'GET',
    url: '/area/community',
    params: {
      name,
      id
    }
  })
}

/**
 * @param {} data
 * 发送我的房子的数据
 */
export const sendhouseinfo = (data) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data
  })
}
