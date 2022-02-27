import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 管理員登入
  adminSignIn({ account, password }) {
    return apiHelper.post(`api/admin/signin`, { 
      account,
      password
     })
  },
  // 取得管理員可見的所有用戶清單
  getAdminUsers() {
    return apiHelper.get(`/admin/users`)
  },
  // 取得管理員可見的 tweet 清單
  getAdminTweets() {
    return apiHelper.get(`admin/tweets`)
  },
  // 刪除使用者的推文
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`api/admin/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}



