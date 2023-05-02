import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Categories extends Core {
  constructor(axios = axiosInstance) {
    super(axios)
  }

  fetchCategories() {
    return this.get('marketplace/category')
  }

  fetchOneCategory(id) {
    return this.get(`marketplace/category/${id}`)
  }

  updateCategory(id, body) {
    return this.put(`role/${id}`, body)
  }

  createCategory(body) {
    return this.post('role', body)
  }

  deleteCategory(id) {
    return this.delete(`marketplace/category/${id}`)
  }

}

export default Categories

