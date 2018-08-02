

const parseJSON = (data) => {
  const tmp = JSON.parse(JSON.stringify(data))

  if (typeof tmp.data === 'string') {
    try {
      tmp.data = JSON.parse(tmp.data)
      return Promise.resolve(tmp)
    } catch (e) {
      tmp.data = {}
      return Promise.resolve(data)
    }
  } else {
    return Promise.resolve(data)
  }
}

const completeHeader = (header) => {
  const result = {
    ...header,
    ...{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'credentials': 'include'
    }
  }

  // const {access_token: accessToken} = app.globalData.index.index

  // if (accessToken) {
  //   result.Authorization = `Bearer ${accessToken}`
  // }

  return result
}


const get = (url, query={}, options={}) => {
  return new Promise( (resolve, reject) => {
    wx.request({
      url: url,
      header: completeHeader(options),
      method: 'GET',
      dataType: 'JSON',
      success: resolve,
      fail: reject
    })
  }).then(parseJSON)
}
const post = (url, query={}, data, options={}) => {
  return new Promise( (resolve, reject) => {
    wx.request({
      url: url,
      data,
      header: completeHeader(options),
      method: 'POST',
      dataType: 'JSON',
      success: resolve,
      fail: reject
    })
  }).then(parseJSON)
}
const HOST = 'https://bricks.upvi.com';


export const getProducts = (query) => {
  return get(`${HOST}/api/v1/products`)
}
export const getProductsOfDetail = (id, query) => {
  return get(`${HOST}/api/v1/products/${id}`)
}

// 获取作者信息
export const getPersonMes = (id, query) => {
  return get(`${HOST}/api/v1/users/${id}`)
}
// 点赞
export const givePraise = (id, data) => {
  return post(`${HOST}/api/v1/products/${id}/votes`, {}, data)
}



