import Vue from 'vue'
import App from './App.vue'
import axios from 'utils/http'

import router from '@/router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss' // global css
import '@/icons/iconfont.css' // icon



Vue.config.productionTip = false
Vue.use(ElementUI);
// 建一个bus总线挂到vue根实列上,方便非父子组件传值
const Bus = new Vue()

// 设置一个全局判断是否为空的函数,后面用  this.isEmpty(value)  即可调用
Vue.prototype.isEmpty = function (value){
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
);
}


Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  　Bus,
  render: h => h(App)
}).$mount('#app')