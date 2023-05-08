import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Units extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get("marketplace/unit" + (params ? "?" + params : ""));
    }

    fetchOne(id) {
        return this.get(`marketplace/unit/${id}`);
    }

    update(id, body) {
        return this.put(`marketplace/unit/${id}`, body);
    }

    create(body) {
        return this.post("marketplace/unit", body);
    }

    deactivate(id) {
        return this.delete(`marketplace/unit/${id}`);
    }
}

export default Units;
