import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 0,
      account: "",
      name: "",
      email: "",
      avatar: "",
      cover: "",
      introduction: "",
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = {
        ...state.currentUser,
        ...user
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
