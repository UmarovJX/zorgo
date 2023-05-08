import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Specifications extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchSpecifications(params = "") {
        return this.get(
            "marketplace/specification" + (params ? "?" + params : "")
        );
    }

    fetchOneSpecification(id) {
        return this.get(`marketplace/specification/${id}`);
    }

    updateSpecification(id, body) {
        return this.post(`marketplace/specification/${id}?_method=put`, body);
    }

    createSpecification(body) {
        return this.post("marketplace/specification", body);
    }

    deleteSpecification(id) {
        return this.delete(`marketplace/specification/${id}`);
    }
}

export default Specifications;
