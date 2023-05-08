import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Dealers extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get("marketplace/dealer" + (params ? "?" + params : ""));
    }

    fetchOne(id) {
        return this.get(`marketplace/dealer/${id}`);
    }

    update(id, body) {
        return this.put(`marketplace/dealer/${id}`, body);
    }

    create(body) {
        return this.post("marketplace/dealer", body);
    }

    deactivate(id) {
        return this.delete(`marketplace/dealer/${id}`);
    }
}

export default Dealers;
