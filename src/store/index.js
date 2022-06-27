import Vue from 'vue'
import Vuex from 'vuex'
// * 这是一个本地存储持久化的插件
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    setuser (state, payload) {
      state.user = payload
    },
    deluser (state) {
      state.user = null
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
