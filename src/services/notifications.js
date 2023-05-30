import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Notifications extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchAll(params = "") {
        return this.get("notification" + (params ? "?" + params : ""));
    }

    create(body) {
        return this.post("notification", body);
    }
}

export default Notifications;
