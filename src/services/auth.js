import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core/index'

class Auth extends Core {
  constructor(axios = axiosInstance) {
    super(axios)
  }

  login(login) {
    return this.post('auth/user/login', login)
  }

  fetchUserDetails() {
    return this.get('auth/user/me')
  }

  logout() {
    return this.post('auth/user/logout')
  }

  updateToken() {
    return this.post('auth/user/refresh')
  }
}

export default Auth

