import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 取得主頁卡片 
  getAllTweets() {
    return apiHelper.get('api/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 取得回覆頁面：主貼文（指定卡片自己的資料）
  getTweet({ tweetId }) {
    return apiHelper.get(`/api/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 取得回覆頁面：所有回覆卡片（指定卡片的所有回覆）
  getAllReplies({ tweetId }) {
    return apiHelper.get(`/api/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 新增推文卡片
  
  // 改片卡片狀態
  addLike({ tweetId }) {
    return apiHelper.post(`/api/tweets/${tweetId}/like`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteLike({ tweetId }) {
    return apiHelper.post(`/api/tweets/${tweetId}/unlike`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}