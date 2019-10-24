import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    beat: 0
  },
  mutations: {
    incrementBeat(state) {
      state.beat = state.beat + 1
    }
  },
  actions: {
    incrementBeat({commit}) {
      commit('incrementBeat')
    }
  }
})