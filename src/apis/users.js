import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 查看指定使用者的資料
  getUser({ userId }) {
    return apiHelper.get(`api/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 查看指定使用者的推文
  getUserTweets({ userId }) {
    return apiHelper.get(`api/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 查看指定使用者的回覆推文
  getUserReplies({ userId }) {
    return apiHelper.get(`api/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 查看指定使用者的喜歡推文
  getUserLikes({ userId }) {
    return apiHelper.get(`api/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 查看指定使用者的追隨者
  getFollowers({ userId }) {
    return apiHelper.get(`api/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 查看指定使用者的正在跟隨
  getFollowings({ userId }) {
    return apiHelper.get(`api/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 追隨 todo: 待確認送出的資料內容，formData
  addFollow( {id} ) {
    return apiHelper.post('/api/followships', {id}, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 取消追隨 todo: 待確認送出的資料內容 followingId ??
  deleteFollow({followingId}) {
    return apiHelper.delete(`api/followships/${followingId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  //取得熱門使用者
  getTopUser() {
    return apiHelper.get("api/users/top", {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}