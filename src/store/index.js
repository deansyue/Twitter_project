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
      password: "123",
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
