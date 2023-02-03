import { axiosInstance } from '@/services/core/base'
import Core from '@/services/core'

class Users extends Core {
    constructor(axios = axiosInstance) {
        super(axios)
    }

    fetchUsers() {
        return this.get('user')
    }

    fetchOneUser(id) {
        return this.get(`user/${id}`)
    }

    updateUser(id, body) {
        return this.put(`user/${id}`, body)
    }

    createUser(body) {
        return this.post('user', body)
    }

    deleteUser(id) {
        return this.delete(`user/${id}`)
    }

}

export default Users

