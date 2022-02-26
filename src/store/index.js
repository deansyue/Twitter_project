import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 1,
      account: "heyJohn",
      name: "John Doe",
      email: "John123@gmail.com",
      avatar:
        "https://loremflickr.com/g/320/240/people/?random=91.66143782652539",
      cover: "https://loremflickr.com/g/600/240/shop/?random=30.68038263159545",
      introduction: "Culpa minus ea ullam.",
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
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
