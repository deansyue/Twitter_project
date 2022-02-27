import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 看見站內所有使用者
  getAllUsers() {
    return apiHelper.get('api/admin/users', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 刪除使用者的推文
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`api/admin/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}