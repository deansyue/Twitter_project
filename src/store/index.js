import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 1,
      account: "vic123",
      name: "vic",
      email: "vvv123@gmail.com",
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
