import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from '../apis/authorization'

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
      role: ""
    },
    isAuthenticated: false,
    token: '',
    tweetCreate: {
      id: "",
      createdAt: "",
      description: "",
    },
    tweetReplyTarget: {
      id: 0,
      userId: 0,
      account: "",
      avatar: "",
      description: "",
      createdAt: ""
    },
    replyCreate: {
      id: "",
      createdAt: "",
      description: "",
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      // 登入：設定目前使用者資料
      state.currentUser = {
        ...state.currentUser,
        ...user
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      // 登出：清空目前使用者資料
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
    passTweetCreate(state, data) {
      // 傳送「新增貼文」之內容
      state.tweetCreate = {
        ...state.tweetCreate,
        ...data
      }
    },
    setTweetReplyTarget(state, data) {
      // 設定「回覆貼文」的目標貼文資料
      state.tweetReplyTarget = {
        ...state.tweetReplyTarget,
        ...data
      }
    },
    passReplyCreate(state, data) {
      // 傳送「回覆貼文」之內容
      state.replyCreate = {
        ...state.replyCreate,
        ...data
      }
    }
  },
  actions: {
    async fetchCurrentUser({ state, commit }) {
      try {
        const response = state.currentUser.role === "user" ?
          await authorizationAPI.getCurrentUser() :
          await authorizationAPI.getCurrentAdminUser()

        console.log(response)
        commit("setCurrentUser", response)
        
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  modules: {
  }
})
