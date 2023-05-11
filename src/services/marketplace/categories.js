import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Categories extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchCategories(params = "") {
        return this.get(
            "marketplace/category" +
                "?filters[type]=category" +
                (params ? "&" + params : "")
        );
    }

    fetchSubCategories(params = "") {
        return this.get(
            "marketplace/category" +
                "?filters[type]=subcategory" +
                (params ? "&" + params : "")
        );
    }

    updatePosition(data) {
        return this.put("marketplace/category/position", data);
    }

    fetchAllCategories() {
        return this.get(
            "marketplace/category/all" +
                "?sort[direction]=asc&sort[column]=position"
        );
    }

    fetchOneCategory(id) {
        return this.get(`marketplace/category/${id}`);
    }

    updateCategory(id, body) {
        return this.post(`marketplace/category/${id}?_method=put`, body);
    }

    createCategory(body) {
        return this.post("marketplace/category", body);
    }

    deleteCategory(id) {
        return this.delete(`marketplace/category/${id}`);
    }
}

export default Categories;
