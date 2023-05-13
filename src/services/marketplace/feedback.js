import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Feedback extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get("marketplace/feedback" + (params ? "?" + params : ""));
    }

    deactivate(id) {
        return this.patch(`marketplace/feedback/${id}`);
    }
}

export default Feedback;
