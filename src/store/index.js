import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage, // 默认位置是 localStorage
    reducer: (state) => {
      return {
        // 默认是全部缓存，在这里可以设置需要缓存的状态
        uname: state.uname
      }
    }
  })],
  state: {
    uname:null
  },
  getters: {
  },
  mutations: {
    namepreservation(state,name){
      state.uname=name
    }
  },
  actions: {
  },
  modules: {
  }
})
