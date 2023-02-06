import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Companies extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetchAll(params = '') {
        if (params) params = '?' + params
        return this.get('insurance/company' + params)
    }

    fetch(id) {
        return this.get(`insurance/company/${id}`)
    }

    update(id, body) {
        return this.post(`insurance/company/${id}?_method=put`, body)
    }

}

export default Companies

