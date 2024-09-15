
import { ApiResponse } from "@/constants/constains";
import http from "@/utils/http";


class BaseService<T> {

    async getList(url: string): Promise<T[]> {
        const response = await http.get<ApiResponse<T[]>>(url);
        return response.data.data;
    }
    
    async getById(url: string, id: string): Promise<T> {
        const response = await http.get<ApiResponse<T>>(url+id)
        return response.data.data;
    }
}
export default new BaseService();