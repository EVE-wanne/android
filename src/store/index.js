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
    user: null,
    currentcity: {
      label: '北京',
      pinyin: 'beijing',
      short: 'bj',
      value: 'AREA|88cff55c-aaa4-e2e0'

    }
  },
  getters: {
  },
  mutations: {
    setuser (state, payload) {
      state.user = payload
    },
    deluser (state) {
      state.user = null
    },
    setcity (state, payload) {
      state.currentcity = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
