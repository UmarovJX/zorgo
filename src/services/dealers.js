import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Dealers extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetchDealers() {
        return this.get('marketplace/dealer')
    }

    fetchOneDealer(id) {
        return this.get(`marketplace/dealer/${id}`)
    }

    updateDealer(id, body) {
        return this.put(`marketplace/dealer/${id}`, body)
    }

    createDealer(body) {
        return this.post('marketplace/dealer', body)
    }

    deleteDealer(id) {
        return this.delete(`marketplace/dealer/${id}`)
    }

}

export default Dealers

