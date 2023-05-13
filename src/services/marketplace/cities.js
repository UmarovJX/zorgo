import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Cities extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get("marketplace/city" + (params ? "?" + params : ""));
    }

    fetchOne(id) {
        return this.get(`marketplace/city/${id}`);
    }

    update(id, body) {
        return this.put(`marketplace/city/${id}`, body);
    }

    create(body) {
        return this.post("marketplace/city", body);
    }

    deactivate(id) {
        return this.delete(`marketplace/city/${id}`);
    }
}

export default Cities;
