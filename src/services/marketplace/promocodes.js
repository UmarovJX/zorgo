import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Promocodes extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get(
            "marketplace/promo-code" + (params ? "?" + params : "")
        );
    }

    fetchOne(id) {
        return this.get(`marketplace/promo-code/${id}`);
    }

    update(id, body) {
        return this.post(`marketplace/promo-code/${id}?_method=put`, body);
    }

    create(body) {
        return this.post("marketplace/promo-code", body);
    }

    deactivate(id) {
        return this.delete(`marketplace/promo-code/${id}`);
    }
}

export default Promocodes;
