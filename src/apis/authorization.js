import { apiHelper } from '../utils/helpers'

export default {
  SignIn({account, password}) {
    return apiHelper.post('api/users/signin', {
      account,
      password
    })
  }
}