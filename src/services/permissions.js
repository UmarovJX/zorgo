import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Permissions extends Core {
  constructor(axios = axiosInstance) {
    super(axios)
  }

  fetchAllPermissions() {
    return this.get('common/permissions/all')
  }

  fetchPermissionsByGroup() {
    return this.get('common/permissions/group')
  }

}

export default Permissions

