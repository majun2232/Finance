import request from '../http'

export function login(loginUser) {
// console.log(loginUser);
  return request({
    url: '/apis/auth/login',
    method: 'post',
    data: {
      account: loginUser.usename,
      password:loginUser.password
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

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: {
//       token
//     }
//   })
// }

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}