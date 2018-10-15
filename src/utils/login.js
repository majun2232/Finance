import jwt_decode from 'jwt-decode'
// import axios from '../http'
import router from '../router'
import store from '../store'
import {
    login1
  } from '../api/login'
const login =  {
    submit(loginUser) {
        //  console.log(loginUser)
//         axios({ method:"post",
//         url:"/apis/auth/login",
//         data:{
//             account:'admin',password:'1'
//         },
//         transformRequest: [function (data) {
//             let ret = ''
//             for (let it in data) {
//               ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//             }
//             return ret
//           }]
//   })
        // .post('apis/auth/login', {account:'admin',password:'1'})


           login1('admin','1').then(res => {
                // 获取token
                console.log(res.data)
                const {
                    token
                } = res.data;
                //  存储到ls
                localStorage.setItem("authorization", token);
                // 解析token
                const decode = jwt_decode(token);
                // console.log(decode);

                // token存储到vuex中
                store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
                store.dispatch("setUser", decode);
                // 页面跳转
                router.push('/index')
            })
    },
    isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
        );
    }
}

export default login