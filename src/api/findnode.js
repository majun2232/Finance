import request from '../http'

export function findnode(node) {
  console.log("进来请求");
  
  return request({
    url: '/apis/api/find_node',
    method: 'get',
    data: {
        userId: "1",
        code:"10"
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}