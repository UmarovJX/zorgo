import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Years extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchYears(params = "") {
        console.log(params);
        return this.get("cars/year" + (params ? "?" + (params) : ""));
    }

    fetchOneYear(id) {
        return this.get(`cars/year/${id}`);
    }

    updateYear(id, body) {
        return this.put(`cars/year/${id}`, body);
    }

    createYear(body) {
        return this.post("cars/year", body);
    }

    deleteYear(id) {
        return this.delete(`cars/year/${id}`);
    }
}

export default Years;
