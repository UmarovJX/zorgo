import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Compilations extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get(
            "marketplace/compilation" + (params ? "?" + params : "")
        );
    }

    fetchAllByPosition() {
        return this.get(
            "marketplace/compilation" +
                "?sort[direction]=asc&sort[column]=position&perPage=9999"
        );
    }

    updatePosition(data) {
        return this.put("marketplace/compilation/position", data);
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
