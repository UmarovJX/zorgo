import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core/index'

class Settings extends Core {
  constructor(axios = axiosInstance) {
    super(axios)
  }

  fetch() {
    return this.get('setting')
  }

  update(body) {
    return this.post('setting?_method=put', body)
  }

}

export default Settings

