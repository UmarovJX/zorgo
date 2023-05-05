import { axiosInstance } from "@/services/core/base";
import Core from "@/services/core";

class Products extends Core {
    constructor(axios = axiosInstance) {
        super(axios);
    }

    fetchProducts(params = "") {
        return this.get("marketplace/product" + (params ? "?" + params : ""));
    }

    fetchOneProduct(id) {
        return this.get(`marketplace/product/${id}`);
    }

    updateProduct(id, body) {
        return this.post(`marketplace/product/${id}?_method=put`, body);
    }

    createProduct(body) {
        return this.post("marketplace/product", body);
    }

    deleteProduct(id) {
        return this.delete(`marketplace/product/${id}`);
    }
}

export default Products;
