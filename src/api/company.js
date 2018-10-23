import request from '../utils/http'

export function getcompanyList(params) {
  return request({
    url: '/company',
    method: 'get',
    params
  })
}

export function getyearList(params) {
  return request({
    url: '/yearly',
    method: 'get',
    params
  })
}

export function getmonthList(params) {
  return request({
    url: '/month',
    method: 'get',
    params
  })
}
