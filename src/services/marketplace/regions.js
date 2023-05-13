import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Regions extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get("marketplace/region" + (params ? "?" + params : ""));
    }

    fetchOne(id) {
        return this.get(`marketplace/region/${id}`);
    }

    update(id, body) {
        return this.put(`marketplace/region/${id}`, body);
    }

    create(body) {
        return this.post("marketplace/region", body);
    }

    deactivate(id) {
        return this.delete(`marketplace/region/${id}`);
    }
}

export default Regions;
