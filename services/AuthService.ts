
import { API, ApiResponse, AuthLogin, AuthRegister, AuthResponse } from "@/constants/constains";
import http from "@/utils/http";


class AuthService {

   async login(authLogin: AuthLogin): Promise<AuthResponse> {
      const response = await http.post<AuthResponse>(API.LOGIN, authLogin);
      return response.data
   }
   async register(authRegister: AuthRegister): Promise<boolean> {
      const response = await http.post<ApiResponse<boolean>>(API.REGISTER, authRegister);
      return response.data.data
   }
}

export default new AuthService();