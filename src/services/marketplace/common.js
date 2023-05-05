import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Common extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchCategories() {
        return this.get("marketplace/common/category");
    }

    fetchSubCategories() {
        return this.get("marketplace/common/category/sub-categories");
    }
    fetchAllCategories() {
        return this.get("marketplace/common/category/all");
    }

    fetchAllSpecifications(id) {
        return this.get(
            "marketplace/common/specifications" +
                (id ? "?filters[categories.id]=" + id : "")
        );
    }

    fetchAllUnits() {
        return this.get("marketplace/common/units");
    }

    fetchOneCategory(id) {
        return this.get(`marketplace/common/category/${id}`);
    }
}

export default Common;
