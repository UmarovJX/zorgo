import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Models extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetchModels() {
        return this.get('cars/model')
    }

    fetchOneModel(id) {
        return this.get(`cars/model/${id}`)
    }

    updateModel(id, body) {
        return this.put(`cars/model/${id}`, body)
    }

    createModel(body) {
        return this.post('cars/model', body)
    }

    deleteModel(id) {
        return this.delete(`cars/model/${id}`)
    }

}

export default Models

