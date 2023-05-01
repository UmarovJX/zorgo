import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Orders extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchOrders(params = "") {
        return this.get("marketplace/order" + (params ? "?" + params : ""));
    }

    fetchOneOrder(id) {
        return this.get(`marketplace/order/${id}`);
    }

    changeStatus(id, data) {
        return this.patch(`marketplace/order/${id}/change-status`, data);
    }
}

export default Orders;
