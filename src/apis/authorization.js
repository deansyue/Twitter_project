import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')
export default {
  // 登入
  SignIn({ account, password }) {
    return apiHelper.post('api/users/signin', {
      account,
      password
    })
  },
  // 註冊
  SignUp({ account, name, email, password, checkPassword }) {
    return apiHelper.post('api/users', { account, name, email, password, checkPassword })

  },
  // 帳號資料更改
  SignEdit({ userId, account, name, email, password, checkPassword }) {
    return apiHelper.put(`api/users/${userId}/edit`, { account, name, email, password, checkPassword }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

  },
  // 管理者登入
  AdminSignIn({ account, password }) {
    return apiHelper.post('api/admin/signin', {
      account,
      password
    })
  },
  // 取得目前使用者資訊
  getCurrentUser() {
    return apiHelper.get('api/users/currentUser', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // 取得目前管理者資訊
  getCurrentAdminUser() {
    return apiHelper.get('api/admin/currentUser', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}