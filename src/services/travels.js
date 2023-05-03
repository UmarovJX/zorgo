import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Travel extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetchPolicies(params = '') {
        if (params) params = '?' + params
        return this.get('insurance/travel' + params)
    }

    fetchPolicy(id) {
        return this.get(`insurance/travel/${id}`)
    }

}

export default Travel

