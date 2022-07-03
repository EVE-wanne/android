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

    },
    houseinfo: { communityName: '请输入小区名字' },
    housecode: null,
    firstlist: []
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
    },
    sethousename (state, payload) {
      state.houseinfo = payload
    },
    sethousecode (state, payload) {
      state.housecode = payload
    },
    setfirstlist (state, payload) {
      state.firstlist = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
