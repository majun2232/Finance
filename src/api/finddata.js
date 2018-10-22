import request from '../http'

export function findData() {
  // console.log("进来请求");
  // debugger
  return request({
    url: '/apis/api/find_node',
    method: 'get',
    params: {
    //   "userId":userId,
    //   "code":code
    }
  })
}