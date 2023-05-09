import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class PublicOffer extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetch(type) {
        return this.get(`public-offer/${type}`);
    }

    update(type, body) {
        return this.put(`public-offer/${type}`, body);
    }
}

export default PublicOffer;
