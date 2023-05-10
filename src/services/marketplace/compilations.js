import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Compilations extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get("marketplace/compilation" + (params ? "?" + params : ""));
    }

    fetchOne(id) {
        return this.get(`marketplace/compilation/${id}`);
    }

    update(id, body) {
        return this.put(`marketplace/compilation/${id}`, body);
    }

    create(body) {
        return this.post("marketplace/compilation", body);
    }

    deactivate(id) {
        return this.delete(`marketplace/compilation/${id}`);
    }
}

export default Compilations;
