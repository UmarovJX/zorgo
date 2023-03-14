import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Description extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetch(type) {
        return this.get(`insurance/description/${type}`)
    }

    update(type, body) {
        return this.put(`insurance/description/${type}`, body)
    }
}

export default Description