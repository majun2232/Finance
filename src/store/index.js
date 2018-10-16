import Vue from 'vue'
import Vuex from 'vuex'
import sideopen from './modules/sideopen'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sideopen,
    user
  },
  getters
})

export default store
