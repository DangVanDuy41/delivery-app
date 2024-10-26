import { Product } from "@/types/Product";
import BaseService from "./BaseService";
import http from "@/utils/http";
import { API, ApiResponse } from "@/constants/constains";

class ProductService extends BaseService<Product> {

    async getListProductByStore(): Promise<Product[]> {
        const response = await http.get<ApiResponse<Product[]>>(API.PRODUCT.GET_LIST_BY_STORE);
        return response.data.data;
    }
    async getListProductByCatogory(id: string): Promise<Product[]> {
        const response = await http.get<ApiResponse<Product[]>>(API.PRODUCT.GET_LIST_BY_CATEGORY + '/' + id)
        return response.data.data;
    }
   
}
export default new ProductService();