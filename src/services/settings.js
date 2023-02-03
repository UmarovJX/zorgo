import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core/index'

class Settings extends Core {
  constructor(axios = axiosInstance) {
    super(axios)
  }

  fetchSettings() {
    return this.get('/api/user')
  }

}

export default Settings

