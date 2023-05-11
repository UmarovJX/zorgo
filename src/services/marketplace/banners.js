import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Banners extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get("marketplace/banner" + (params ? "?" + params : ""));
    }

    fetchAllByPosition() {
        return this.get(
            "marketplace/banner" +
                "?sort[direction]=asc&sort[column]=position&perPage=9999"
        );
    }

    updatePosition(data) {
        return this.put("marketplace/banner/position", data);
    }

    fetchOne(id) {
        return this.get(`marketplace/banner/${id}`);
    }

    update(id, body) {
        return this.post(`marketplace/banner/${id}?_method=put`, body);
    }

    create(body) {
        return this.post("marketplace/banner", body);
    }

    deactivate(id) {
        return this.delete(`marketplace/banner/${id}`);
    }
}

export default Banners;
