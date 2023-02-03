import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Services extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetchServices(params = '') {
        return this.get('insurance/service?sort[direction]=asc' + params)
    }

    fetchOneService(id) {
        return this.get(`insurance/service/${id}`)
    }

    updateService(id, body) {
        return this.post(`insurance/service/${id}?_method=put`, body)
    }

    deleteService(id) {
        return this.delete(`insurance/service/${id}`)
    }

}

export default Services

