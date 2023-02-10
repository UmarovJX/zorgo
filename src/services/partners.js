import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Partners extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetchAll() {
        return this.get('insurance/partner')
    }

    fetch(id) {
        return this.get(`insurance/partner/${id}`)
    }

    update(id, body) {
        return this.post(`insurance/partner/${id}?_method=put`, body)
    }

    create(body) {
        return this.post('insurance/partner', body)
    }

    deactivate(id) {
        return this.delete(`insurance/partner/${id}`)
    }

}

export default Partners

