import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Categories extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchCategories(params = "") {
        return this.get("marketplace/category" + (params ? "?" + params : ""));
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
