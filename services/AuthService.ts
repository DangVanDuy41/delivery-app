
import { API, Auth, AuthResponse } from "@/constants/constains";
import http from "@/utils/http";


class AuthService{
 
     async login(auth:Auth):Promise<AuthResponse>{
        const response = await http.post<AuthResponse>(API.LOGIN,auth);
        return response.data
     }

}

export default new AuthService();