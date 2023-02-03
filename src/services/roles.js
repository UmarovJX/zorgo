import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Roles extends Core {
  constructor(axios = axiosInstance) {
    super(axios)
  }

  fetchRoles() {
    return this.get('role')
  }

  fetchOneRole(id) {
    return this.get(`role/${id}`)
  }

  updateRole(id, body) {
    return this.put(`role/${id}`, body)
  }

  createRole(body) {
    return this.post('role', body)
  }

  deleteRole(id) {
    return this.delete(`role/${id}`)
  }

}

export default Roles

