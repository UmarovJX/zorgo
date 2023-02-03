import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Brands extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetchBrands() {
        return this.get('cars/brand')
    }

    fetchOneBrand(id) {
        return this.get(`cars/brand/${id}`)
    }

    updateBrand(id, body) {
        return this.put(`cars/brand/${id}`, body)
    }

    createBrand(body) {
        return this.post('cars/brand', body)
    }

    deleteBrand(id) {
        return this.delete(`cars/brand/${id}`)
    }

}

export default Brands

