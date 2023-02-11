import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class MainPage extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetch(type) {
        return this.get(`insurance/section/${type}`)
    }

    update(type, body) {
        return this.post(`insurance/section/${type}?_method=put`, body)
    }
}

export default MainPage

