import { apiHelper } from '../utils/helpers'

export default {
  SignIn({ account, password }) {
    return apiHelper.post('api/users/signin', {
      account,
      password
    })
  },
  SignUp({ account, name, email, password, checkPassword }) {
    return apiHelper.post('api/users', { account, name, email, password, checkPassword })
  },
}