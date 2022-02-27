import { apiHelper } from '../utils/helpers'

export default {
  // 登入
  SignIn ({account, password}) {
    return apiHelper.post('api/users/signin', {
      account,
      password
    })
  },
  // 註冊

  // 帳號資料更改

  // 管理者登入
  AdminSignIn({ account, password }) {
    return apiHelper.post('api/admin/signin', {
      account,
      password
    })
  },
}