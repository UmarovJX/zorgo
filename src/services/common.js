import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Common extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    getBrands() {
        return this.get("common/brands-list");
    }

    getModels(){
        return this.get("common/models-list");
    }
}

export default Common;
