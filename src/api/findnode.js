import request from 'utils/http'

export function findnode(userId,code) {
  // console.log("进来请求");
  // debugger
  return request({
    url: '/apis/api/find_node',
    method: 'get',
    params: {
      "userId":userId,
      "code":code
    }
  })
}