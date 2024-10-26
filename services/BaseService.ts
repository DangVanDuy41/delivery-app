
import { ApiResponse } from "@/constants/constains";
import http from "@/utils/http";


class BaseService<T> {
    async create(url:string,body:T):Promise<boolean>{
        const response = await http.post<ApiResponse<boolean>>(url,body);
        return response.data.data;
    }
    async getList(url: string): Promise<T[]> {
        const response = await http.get<ApiResponse<T[]>>(url);
        return response.data.data;
    }
    
    async getById(url: string, id: string): Promise<T> {
        const response = await http.get<ApiResponse<T>>(url+id)
        return response.data.data;
    }
}
export default BaseService;