import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 取得主頁卡片：所有推文
  getAllTweets() {
    return apiHelper.get('api/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 取得回覆頁面：主貼文（指定卡片自己的資料 object）
  getRepliedTweet({ tweetId }) {
    return apiHelper.get(`api/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 取得回覆頁面：所有回覆卡片（指定卡片的所有回覆 array）
  getAllReplies({ tweetId }) {
    return apiHelper.get(`api/tweets/${tweetId}/replies` , {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 新增推文卡片
  
  // 新增回覆卡片

  // 卡片狀態：喜歡
  addLike({ tweetId }) {
    return apiHelper.post(`api/tweets/${tweetId}/like`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 卡片狀態：取消喜歡
  deleteLike({ tweetId }) {
    return apiHelper.post(`api/tweets/${tweetId}/unlike`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}